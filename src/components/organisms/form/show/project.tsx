import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectStatus, StackCategory, type Project } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, Pen } from 'lucide-react';
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
import { ProjectUpdateSchema } from '@/schemas/project/update';
import { useTranslations } from '@/hooks/use-translations';

/**
 * Form to show a project.
 * @param params - The component props
 * @param params.currentProject - The current project to show
 * @returns The show project form
 */
export function ShowProjectForm({ currentProject }: { currentProject: Project }) {
  const { t } = useTranslations();
  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(ProjectUpdateSchema),
    defaultValues: currentProject,
  });

  return (
    <Form {...form}>
      <form className='space-y-8'>
        <div className='flex flex-wrap gap-2'>
          <FormField
            control={form.control}
            name='key'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-project-form.key')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-project-form.key-aria')}
                    placeholder={t('components.show-project-form.key-placeholder')}
                    {...field}
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
                <FormLabel>{t('components.show-project-form.name')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-project-form.name-aria')}
                    placeholder={t('components.show-project-form.name-placeholder')}
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
                <FormLabel>{t('components.show-project-form.status')}</FormLabel>
                <Select
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue
                        placeholder={t('components.show-project-form.status-placeholder')}
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
                <FormLabel>{t('components.show-project-form.stack')}</FormLabel>
                <Select
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue
                        placeholder={t('components.show-project-form.stack-placeholder')}
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
                <FormLabel>{t('components.show-project-form.start-date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled
                        aria-label={t('components.show-project-form.start-date-aria')}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        variant='outline'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>{t('components.show-project-form.no-start-date')}</span>
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
                <FormLabel>{t('components.show-project-form.end-date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled
                        aria-label={t('components.show-project-form.end-date-aria')}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        variant='outline'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>{t('components.show-project-form.no-end-date')}</span>
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
                <FormLabel>{t('components.show-project-form.description')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
                    aria-label={t('components.show-project-form.description-aria')}
                    placeholder={t('components.show-project-form.description-placeholder')}
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
                <FormLabel>{t('components.show-project-form.goals')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
                    aria-label={t('components.show-project-form.goals-aria')}
                    placeholder={t('components.show-project-form.goals-placeholder')}
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
                <FormLabel>{t('components.show-project-form.contributions')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
                    aria-label={t('components.show-project-form.contributions-aria')}
                    placeholder={t('components.show-project-form.contributions-placeholder')}
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
                <FormLabel>{t('components.show-project-form.logo-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-project-form.logo-url-aria')}
                    placeholder={t('components.show-project-form.logo-url-placeholder')}
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
                <FormLabel>{t('components.show-project-form.primary-color')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-project-form.primary-color-aria')}
                    placeholder={t('components.show-project-form.primary-color-placeholder')}
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
                <FormLabel>{t('components.show-project-form.demo-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-project-form.demo-url-aria')}
                    placeholder={t('components.show-project-form.demo-url-placeholder')}
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
                <FormLabel>{t('components.show-project-form.github-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-project-form.github-url-aria')}
                    placeholder={t('components.show-project-form.github-url-placeholder')}
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <a
          aria-label={t('components.show-project-form.edit-aria')}
          className='border-input flex size-max items-center gap-2 rounded-md border bg-gray-500 p-2 px-4 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400'
          href={`/vault/views/project/${currentProject.id}/edit`}
        >
          <Pen className='size-5' />
          <span className='text-lg'>{t('components.show-project-form.edit')}</span>
        </a>
      </form>
    </Form>
  );
}
