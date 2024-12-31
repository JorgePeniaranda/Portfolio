import {zodResolver} from "@hookform/resolvers/zod";
import {StackCategory, StackType, type Project, type Stack} from "@prisma/client";
import {Save, X} from "lucide-react";
import {useForm} from "react-hook-form";

import {
  STACK_CATEGORY_TRANSCRIPTIONS,
  STACK_TYPE_TRANSCRIPTIONS,
} from "../../../constants/transcriptions";
import {useToast} from "../../../hooks/use-toast";
import {StackUpdateSchema} from "../../../schemas/stack/update";
import {patchDeleteRelationWithProjectFromStack} from "../../../services/stack/patchDeleteRelationWithProjectFromStack";
import {putStack} from "../../../services/stack/putStack";
import {Button} from "../../ui/button";
import {Card, CardHeader} from "../../ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Textarea} from "../../ui/textarea";

import {RelationshipStackWithProject} from "./relationship-stack-with-project";

export function UpdateStackForm({
  currentStack,
  disableForm,
  availableProjects,
}: {
  currentStack: Stack & {
    associatedProjects: Pick<Project, "id" | "name" | "logoUrl">[];
  };
  availableProjects: Pick<Project, "id" | "name" | "logoUrl">[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<StackUpdateSchema>({
    resolver: zodResolver(StackUpdateSchema),
    defaultValues: currentStack,
  });

  const onSubmit = async (values: StackUpdateSchema) => {
    const response = await putStack(values);

    if (response.success) {
      form.reset();
      toast({
        title: "Stack actualizado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al actualizar stack",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  const onRemoveProject = async (idProject: number) => {
    const response = await patchDeleteRelationWithProjectFromStack({
      idFrom: currentStack.id,
      idTo: idProject,
    });

    if (response.success) {
      toast({
        title: "Proyecto eliminado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al eliminar proyecto",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-2">
          <FormField
            control={form.control}
            name="key"
            render={({field}) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input disabled={disableForm} placeholder="Key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="Nombre"
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder="Descripción"
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({field}) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  defaultValue={field.value === null ? undefined : field.value}
                  disabled={disableForm}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Descripción" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(StackCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {STACK_CATEGORY_TRANSCRIPTIONS[category]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({field}) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  defaultValue={field.value === null ? undefined : field.value}
                  disabled={disableForm}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(StackType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {STACK_TYPE_TRANSCRIPTIONS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>URL de icono</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="iconURL"
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="flex size-max items-center gap-2 rounded-lg bg-lime-600 p-2 text-white hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700"
          disabled={disableForm}
          type="submit"
        >
          <Save className="size-7" />
          <span className="text-lg">Guardar</span>
        </Button>
      </form>
      <div className="mt-10">
        <h2 className="text-3xl font-medium">Editar relaciones</h2>
        <div className="mx-5 mt-5">
          <h3 className="text-3xl font-medium">Proyectos</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentStack.associatedProjects?.map((project) => (
              <li key={project.id}>
                <Card className="my-5 flex flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative flex items-center gap-2">
                    <Button
                      aria-label="eliminar relacion"
                      className="absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                      disabled={disableForm}
                      onClick={() => onRemoveProject(project.id)}
                    >
                      <X />
                      <span className="sr-only">eliminar relacion</span>
                    </Button>
                    <img
                      alt={`${project.name} logo`}
                      className="size-16 shrink-0"
                      src={project.logoUrl}
                    />
                    <span className="text-lg capitalize">{project.name}</span>
                  </CardHeader>
                </Card>
              </li>
            ))}
            <li>
              <RelationshipStackWithProject
                availableProject={availableProjects}
                disableForm={disableForm}
                idFrom={currentStack.id}
              />
            </li>
          </ul>
        </div>
      </div>
    </Form>
  );
}
