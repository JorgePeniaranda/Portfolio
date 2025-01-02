import {zodResolver} from "@hookform/resolvers/zod";
import {
  ProjectStatus,
  StackCategory,
  type Collaborator,
  type Project,
  type Stack,
} from "@prisma/client";
import {format} from "date-fns";
import {CalendarIcon, Save, X} from "lucide-react";
import {useForm} from "react-hook-form";

import {RelationshipProjectWithCollaborator} from "@/components/organisms/form/relationship-project-with-collaborator";
import {RelationshipProjectWithStack} from "@/components/organisms/form/relationship-project-with-stack";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Card, CardHeader} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from "@/constants/transcriptions";
import {cn} from "@/helpers/common/classnames";
import {useToast} from "@/hooks/use-toast";
import {ProjectUpdateSchema} from "@/schemas/project/update";
import {patchDeleteRelationWithCollaboratorFromProject} from "@/services/project/patchDeleteRelationWithCollaboratorFromProject";
import {patchDeleteRelationWithStackFromProject} from "@/services/project/patchDeleteRelationWithStackFromProject";
import {putProject} from "@/services/project/putProject";

export function UpdateProjectForm({
  currentProject,
  disableForm,
  availableStacks,
  availableCollaborators,
}: {
  currentProject: Project & {
    associatedStacks: Array<Stack>;
    associatedCollaborators: Array<Collaborator>;
  };
  disableForm?: boolean;
  availableStacks: Pick<Stack, "id" | "name" | "iconUrl">[];
  availableCollaborators: Pick<Collaborator, "id" | "nickname" | "githubUsername">[];
}) {
  const {toast} = useToast();
  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(ProjectUpdateSchema),
    defaultValues: currentProject,
  });

  const onSubmit = async (values: ProjectUpdateSchema) => {
    const response = await putProject(values);

    if (response.success) {
      form.reset();
      toast({
        title: "Proyecto creado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al crear proyecto",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  const onRemoveCollaborator = async (collaboratorId: number) => {
    const response = await patchDeleteRelationWithCollaboratorFromProject({
      idFrom: currentProject.id,
      idTo: collaboratorId,
    });

    if (response.success) {
      toast({
        title: "Colaborador eliminado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al eliminar colaborador",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  const onRemoveStack = async (stackId: number) => {
    const response = await patchDeleteRelationWithStackFromProject({
      idFrom: currentProject.id,
      idTo: stackId,
    });

    if (response.success) {
      toast({
        title: "Stack eliminado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al eliminar stack",
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
            name="status"
            render={({field}) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  defaultValue={field.value === null ? undefined : field.value}
                  disabled={disableForm}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ProjectStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {PROJECT_STATUS_TRANSCRIPTIONS[status]}
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
            name="stackCategory"
            render={({field}) => (
              <FormItem>
                <FormLabel>Stack</FormLabel>
                <Select
                  defaultValue={field.value === null ? undefined : field.value}
                  disabled={disableForm}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Stack" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(StackCategory).map((stack) => (
                      <SelectItem key={stack} value={stack}>
                        {STACK_CATEGORY_TRANSCRIPTIONS[stack]}
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
            name="startDate"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={disableForm}
                        variant="outline"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Seleccionar fecha de inicio</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={disableForm}
                        variant="outline"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Seleccionar fecha de fin</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value === null ? undefined : field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
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
            name="goals"
            render={({field}) => (
              <FormItem>
                <FormLabel>Objetivos</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder="Objetivos"
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
            name="contributions"
            render={({field}) => (
              <FormItem>
                <FormLabel>Contribuciones</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder="Contribuciones"
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
            name="logoUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>URL de logo</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="URL de logo"
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
            name="primaryColor"
            render={({field}) => (
              <FormItem>
                <FormLabel>Color Primario</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="Color Primario"
                    type="color"
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
            name="demoUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>URL de demo</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="URL de demo"
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
            name="githubUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>URL de Github</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="URL de Github"
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
          <h3 className="text-3xl font-medium">Stack</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentProject.associatedStacks?.map((stack) => (
              <li key={stack.id}>
                <Card className="my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative">
                    <Button
                      aria-label="eliminar relacion"
                      className="absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                      disabled={disableForm}
                      onClick={() => onRemoveStack(stack.id)}
                    >
                      <X />
                      <span className="sr-only">eliminar relacion</span>
                    </Button>
                    <img
                      alt={`${stack.name} logo`}
                      className="size-20 rounded-lg"
                      src={stack.iconUrl}
                    />
                  </CardHeader>
                </Card>
              </li>
            ))}
            <li>
              <RelationshipProjectWithStack
                availableStacks={availableStacks}
                idFrom={currentProject.id}
              />
            </li>
          </ul>
        </div>
        <div className="mx-5 mt-5">
          <h3 className="text-3xl font-medium">Colaboradores</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentProject.associatedCollaborators?.map((collaborator) => (
              <li key={collaborator.id}>
                <Card className="my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative flex items-center gap-2">
                    <Button
                      aria-label="eliminar relacion"
                      className="absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                      disabled={disableForm}
                      onClick={() => onRemoveCollaborator(collaborator.id)}
                    >
                      <X />
                      <span className="sr-only">eliminar relacion</span>
                    </Button>
                    <Avatar className="size-16 shrink-0">
                      <AvatarImage
                        src={`https://avatars.githubusercontent.com/${collaborator.githubUsername}`}
                      />
                      <AvatarFallback>{collaborator.githubUsername}</AvatarFallback>
                    </Avatar>
                    <span className="text-lg capitalize">{collaborator.githubUsername}</span>
                  </CardHeader>
                </Card>
              </li>
            ))}
            <li>
              <RelationshipProjectWithCollaborator
                availableCollaborators={availableCollaborators}
                disableForm={disableForm}
                idFrom={currentProject.id}
              />
            </li>
          </ul>
        </div>
      </div>
    </Form>
  );
}
