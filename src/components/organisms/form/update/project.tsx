import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectStatus, StackCategory, type Project } from '@prisma/client';
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
import { useToast } from '@/hooks/use-toast';
import useTranslations from '@/hooks/use-translations';
import { ProjectUpdateSchema } from '@/schemas/project/update';
import { putProject } from '@/services/project/putProject';
import { handleErrorWithToast } from '@/helpers/error/toast-handler';

/**
 * Form to update a project.
 * @param params - The component props
 * @param params.currentProject - The current project to update
 * @param params.disableForm - Whether the form should be disabled
 * @returns The update project form
 */
export function UpdateProjectForm({
  currentProject,
  disableForm,
}: {
  currentProject: Project;
  disableForm?: boolean;
}) {
  const { toast } = useToast();
  const { t } = useTranslations();

  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(ProjectUpdateSchema),
    defaultValues: currentProject,
  });

  const onSubmit = async (values: ProjectUpdateSchema) => {
    try {
      await putProject({
        idProject: currentProject.id,
        projectUpdateInput: values,
      });

      // Show a success toast
      toast({
        title: t('components.update-project-form.success-title'),
        description: t('components.update-project-form.success-description'),
        className: 'bg-green-500 text-black',
      });
    } catch (error) {
      handleErrorWithToast({
        error,
        title: t('components.update-project-form.error-title'),
        defaultErrorMessage: t('components.update-project-form.error-description'),
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
                <FormLabel>{t('components.update-project-form.key')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.key-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.key-aria')}
                  />
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
                <FormLabel>{t('components.update-project-form.name')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.name-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.name-aria')}
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
                <FormLabel>{t('components.update-project-form.status')}</FormLabel>
                <Select
                  defaultValue={field.value === null ? undefined : field.value}
                  disabled={disableForm}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue
                        placeholder={t('components.update-project-form.status-placeholder')}
                      />
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
                <FormLabel>{t('components.update-project-form.stack')}</FormLabel>
                <Select
                  defaultValue={field.value === null ? undefined : field.value}
                  disabled={disableForm}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue
                        placeholder={t('components.update-project-form.stack-placeholder')}
                      />
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
                <FormLabel>{t('components.update-project-form.start-date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        aria-label={t('components.update-project-form.start-date-aria')}
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
                          <span>{t('components.update-project-form.select-start-date')}</span>
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
                <FormLabel>{t('components.update-project-form.end-date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        aria-label={t('components.update-project-form.end-date-aria')}
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
                          <span>{t('components.update-project-form.select-end-date')}</span>
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
                <FormLabel>{t('components.update-project-form.description')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.description-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.description-aria')}
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
                <FormLabel>{t('components.update-project-form.goals')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.goals-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.goals-aria')}
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
                <FormLabel>{t('components.update-project-form.contributions')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.contributions-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.contributions-aria')}
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
                <FormLabel>{t('components.update-project-form.logo-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.logo-url-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.logo-url-aria')}
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
                <FormLabel>{t('components.update-project-form.primary-color')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.primary-color-placeholder')}
                    type='color'
                    {...field}
                    aria-label={t('components.update-project-form.primary-color-aria')}
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
                <FormLabel>{t('components.update-project-form.demo-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.demo-url-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.demo-url-aria')}
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
                <FormLabel>{t('components.update-project-form.github-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.update-project-form.github-url-placeholder')}
                    {...field}
                    aria-label={t('components.update-project-form.github-url-aria')}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          aria-label={t('components.update-project-form.submit-aria')}
          className='flex size-max items-center gap-2 rounded-lg bg-lime-600 p-2 text-white hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700'
          disabled={disableForm}
          type='submit'
        >
          <Save className='size-7' />
          <span className='text-lg'>{t('components.update-project-form.submit')}</span>
        </Button>
      </form>
    </Form>
  );
}
