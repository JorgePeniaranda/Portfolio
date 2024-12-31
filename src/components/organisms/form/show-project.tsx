import {zodResolver} from "@hookform/resolvers/zod";
import {
  ProjectStatus,
  StackCategory,
  type Collaborator,
  type Project,
  type Stack,
} from "@prisma/client";
import {format} from "date-fns";
import {CalendarIcon, Pen} from "lucide-react";
import {useForm} from "react-hook-form";

import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from "../../../constants/transcriptions";
import {cn} from "../../../helpers/common/classnames";
import {ProjectUpdateSchema} from "../../../schemas/project/update";
import {Avatar, AvatarFallback, AvatarImage} from "../../ui/avatar";
import {Button} from "../../ui/button";
import {Calendar} from "../../ui/calendar";
import {Card, CardHeader} from "../../ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Textarea} from "../../ui/textarea";

export function ShowProjectForm({
  currentProject,
}: {
  currentProject: Project & {
    associatedStacks: Array<Stack>;
    associatedCollaborators: Array<Collaborator>;
  };
}) {
  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(ProjectUpdateSchema),
    defaultValues: currentProject,
  });

  const handleEdit = () => {
    window.location.href = `/vault/views/project/${currentProject.id}/edit`;
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
            name="status"
            render={({field}) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
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
            name="stack"
            render={({field}) => (
              <FormItem>
                <FormLabel>Stack</FormLabel>
                <Select
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
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
                        disabled
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        variant="outline"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Sin fecha de inicio</span>
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
                        disabled
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        variant="outline"
                      >
                        {field.value ? format(field.value, "PPP") : <span>Sin fecha de fin</span>}
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
            name="goals"
            render={({field}) => (
              <FormItem>
                <FormLabel>Objetivos</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
          <h3 className="text-3xl font-medium">Stack</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentProject.associatedStacks?.map((stack) => (
              <li key={stack.id}>
                <Card className="my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative">
                    <img
                      alt={`${stack.name} logo`}
                      className="size-20 rounded-lg"
                      src={stack.iconUrl}
                    />
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-5 mt-5">
          <h3 className="text-3xl font-medium">Colaboradores</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentProject.associatedCollaborators?.map((collaborator) => (
              <li key={collaborator.id}>
                <Card className="my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative flex items-center gap-2">
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
          </ul>
        </div>
      </div>
    </Form>
  );
}
