import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectStatus, StackCategory } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { cn } from '@/helpers/common/classnames';
import { handleErrorWithToast } from '@/helpers/error/toast-handler';
import { isDefined } from '@/helpers/guards/is-defined';
import { useToast } from '@/hooks/use-toast';
import { ProjectCreateDefaultValues, ProjectCreateSchema } from '@/schemas/project/create';
import { postProject } from '@/services/project/postProject';

/**
 * Form to show a project.
 * @param params - The component props
 * @param params.disableForm - Whether the form should be disabled
 * @returns The show project form
 */
export function CreateProjectForm({ disableForm = false }: { disableForm?: boolean }) {
  const { toast } = useToast();

  const form = useForm<ProjectCreateSchema>({
    resolver: zodResolver(ProjectCreateSchema),
    defaultValues: ProjectCreateDefaultValues,
  });

  const onSubmit = async (values: ProjectCreateSchema) => {
    try {
      const response = await postProject(values);

      // Reset the form
      form.reset();

      // Show a success toast
      toast({
        title: 'Proyecto creado',
        description: 'El proyecto ha sido creado exitosamente.',
        className: 'bg-green-500 text-black',
      });

      // Redirect to the new project page
      if (isDefined(response?.id)) {
        window?.location?.assign?.(`/vault/views/project/${response.id}`);
      }
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'No se pudo crear el proyecto',
        defaultErrorMessage: 'Ha ocurrido un error al intentar crear el proyecto.',
        tryAgain: () => onSubmit(values),
      });
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-wrap gap-2'>
          <FormField
            control={form.control}
            name='key'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input disabled={disableForm} placeholder='Key' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder='Nombre'
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
            name='status'
            render={({ field }) => (
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
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Estado' />
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
            name='stackCategory'
            render={({ field }) => (
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
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Stack' />
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
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        disabled={disableForm}
                        variant='outline'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccionar fecha de inicio</span>
                        )}
                        <CalendarIcon className='ml-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-auto p-0'>
                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Fecha de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        disabled={disableForm}
                        variant='outline'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccionar fecha de fin</span>
                        )}
                        <CalendarIcon className='ml-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-auto p-0'>
                    <Calendar
                      mode='single'
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder='Descripción'
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
            name='goals'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivos</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder='Objetivos'
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
            name='contributions'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribuciones</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder='Contribuciones'
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
            name='logoUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de logo</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder='URL de logo'
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
            name='primaryColor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Primario</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder='Color Primario'
                    type='color'
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
            name='demoUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de demo</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder='URL de demo'
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
            name='githubUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de Github</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder='URL de Github'
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
          className='flex size-max items-center gap-2 rounded-lg bg-lime-600 p-2 text-white hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700'
          disabled={disableForm}
          type='submit'
        >
          <Save className='size-7' />
          <span className='text-lg'>Crear</span>
        </Button>
      </form>
    </Form>
  );
}
