import {zodResolver} from "@hookform/resolvers/zod";
import {StackCategory, StackType, type Project, type Stack} from "@prisma/client";
import {Pen} from "lucide-react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Card, CardHeader} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {STACK_CATEGORY_TRANSCRIPTIONS, STACK_TYPE_TRANSCRIPTIONS} from "@/constants/transcriptions";
import {isNotDefined} from "@/helpers/guards/is-defined";
import {StackCreateSchema} from "@/schemas/stack/create";

export function ShowStackForm({
  currentStack,
}: {
  currentStack: Stack & {
    associatedProjects: Pick<Project, "id" | "name" | "logoUrl">[];
  };
}) {
  const form = useForm<StackCreateSchema>({
    resolver: zodResolver(StackCreateSchema),
    defaultValues: currentStack,
  });

  const handleEdit = () => {
    window.location.href = `/vault/views/stack/${currentStack.id}/edit`;
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-wrap gap-2">
          <FormField
            control={form.control}
            name="key"
            render={({field}) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Key" {...field} />
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
                    disabled
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
                    disabled
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
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
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
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
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
                    disabled
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
          className="size-max gap-2 bg-gray-500 p-2 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400"
          variant="outline"
          onClick={handleEdit}
        >
          <Pen className="size-5" />
          <span className="text-lg">Editar</span>
        </Button>
      </form>
      <div className="mt-10">
        <h2 className="text-3xl font-medium">Relaciones</h2>
        <div className="mx-5 mt-5">
          <h3 className="text-3xl font-medium">Proyectos</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentStack.associatedProjects?.map((project) => (
              <li key={project.id}>
                <Card className="my-5 flex flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative flex items-center gap-2">
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
            {(isNotDefined(currentStack.associatedProjects) ||
              currentStack.associatedProjects?.length === 0) && (
              <p className="indent-2 text-lg text-gray-500">No hay proyectos asociados</p>
            )}
          </ul>
        </div>
      </div>
    </Form>
  );
}
