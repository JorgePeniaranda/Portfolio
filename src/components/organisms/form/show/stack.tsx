import { zodResolver } from '@hookform/resolvers/zod';
import { StackCategory, StackType, type Stack } from '@prisma/client';
import { Pen } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  STACK_CATEGORY_TRANSCRIPTIONS,
  STACK_TYPE_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { StackCreateSchema } from '@/schemas/stack/create';
import { useTranslations } from '@/hooks/use-translations';

/**
 * Form to show a stack.
 * @param params - The component props
 * @param params.currentStack - The current stack to show
 * @returns The show stack form
 */
export function ShowStackForm({ currentStack }: { currentStack: Stack }) {
  const { t } = useTranslations();
  const form = useForm<StackCreateSchema>({
    resolver: zodResolver(StackCreateSchema),
    defaultValues: currentStack,
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
                <FormLabel>{t('components.show-stack-form.key')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-stack-form.key-aria')}
                    placeholder={t('components.show-stack-form.key-placeholder')}
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
                <FormLabel>{t('components.show-stack-form.name')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-stack-form.name-aria')}
                    placeholder={t('components.show-stack-form.name-placeholder')}
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-stack-form.description')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
                    aria-label={t('components.show-stack-form.description-aria')}
                    placeholder={t('components.show-stack-form.description-placeholder')}
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
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-stack-form.category')}</FormLabel>
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
                        placeholder={t('components.show-stack-form.category-placeholder')}
                      />
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
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-stack-form.type')}</FormLabel>
                <Select
                  disabled
                  defaultValue={field.value === null ? undefined : field.value}
                  onValueChange={field.onChange}
                  {...field}
                  value={field.value === null ? undefined : field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder={t('components.show-stack-form.type-placeholder')} />
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
            name='iconUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-stack-form.icon-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    aria-label={t('components.show-stack-form.icon-url-aria')}
                    placeholder={t('components.show-stack-form.icon-url-placeholder')}
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
          aria-label={t('components.show-stack-form.edit-aria')}
          className='border-input flex size-max items-center gap-2 rounded-md border bg-gray-500 p-2 px-4 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400'
          href={`/vault/views/stack/${currentStack.id}/edit`}
        >
          <Pen className='size-5' />
          <span className='text-lg'>{t('components.show-stack-form.edit')}</span>
        </a>
      </form>
    </Form>
  );
}
