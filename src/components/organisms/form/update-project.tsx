import {zodResolver} from "@hookform/resolvers/zod";
import {ProjectStatus, StackCategory, type Project} from "@prisma/client";
import {CalendarIcon, Save} from "lucide-react";
import {useForm} from "react-hook-form";
import {format} from "date-fns";

import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from "../../../constants/transcriptions";
import {useToast} from "../../../hooks/use-toast";
import {ProjectUpdateSchema} from "../../../schemas/project/update";
import {Button} from "../../ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Textarea} from "../../ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import {cn} from "../../../helpers/common/classnames";
import {Calendar} from "../../ui/calendar";
import {putProject} from "../../../services/project/putProject";

export function UpdateProjectForm({
  defaultValues,
  disableForm,
}: {
  defaultValues: Project;
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(ProjectUpdateSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: ProjectUpdateSchema) => {
    const response = await putProject(values);

    if (response.success) {
      form.reset();
      toast({
        title: "Stack creado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al crear stack",
        description: response.message,
        className: "bg-red-500",
      });
    }
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
            name="stack"
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
    </Form>
  );
}
