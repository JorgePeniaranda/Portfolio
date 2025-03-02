import { zodResolver } from '@hookform/resolvers/zod';
import { StackCategory, StackType } from '@prisma/client';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
import { handleErrorWithToast } from '@/helpers/error/toast-handler';
import { isDefined } from '@/helpers/guards/is-defined';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/hooks/use-translations';
import { StackCreateDefaultValues, StackCreateSchema } from '@/schemas/stack/create';
import { postStack } from '@/services/stack/postStack';

/**
 * Form to show a stack.
 * @param params - The component props
 * @param params.disableForm - Whether the form should be disabled
 * @returns The show stack form
 */
export function CreateStackForm({ disableForm = false }: { disableForm?: boolean }) {
  const { toast } = useToast();
  const { t } = useTranslations();

  const form = useForm<StackCreateSchema>({
    resolver: zodResolver(StackCreateSchema),
    defaultValues: StackCreateDefaultValues,
  });

  const onSubmit = async (values: StackCreateSchema) => {
    try {
      const response = await postStack(values);

      // Reset the form
      form.reset();

      // Show a success toast
      toast({
        title: t('components.create-stack-form.success-title'),
        description: t('components.create-stack-form.success-description'),
        className: 'bg-green-500 text-black',
      });

      // Redirect to the new stack page
      if (isDefined(response?.id)) {
        window?.location?.assign?.(`/vault/views/stack/${response.id}`);
      }
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'components.create-stack-form.error-title',
        defaultErrorMessage: 'components.create-stack-form.error-description',
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
                <FormLabel>{t('components.create-stack-form.key')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.create-stack-form.key-placeholder')}
                    {...field}
                    aria-label={t('components.create-stack-form.key-aria')}
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
                <FormLabel>{t('components.create-stack-form.name')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.create-stack-form.name-placeholder')}
                    {...field}
                    aria-label={t('components.create-stack-form.name-aria')}
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
                <FormLabel>{t('components.create-stack-form.description')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disableForm}
                    placeholder={t('components.create-stack-form.description-placeholder')}
                    {...field}
                    aria-label={t('components.create-stack-form.description-aria')}
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
                <FormLabel>{t('components.create-stack-form.category')}</FormLabel>
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
                        placeholder={t('components.create-stack-form.category-placeholder')}
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
                <FormLabel>{t('components.create-stack-form.type')}</FormLabel>
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
                        placeholder={t('components.create-stack-form.type-placeholder')}
                      />
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
                <FormLabel>{t('components.create-stack-form.icon-url')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder={t('components.create-stack-form.icon-url-placeholder')}
                    {...field}
                    aria-label={t('components.create-stack-form.icon-url-aria')}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          aria-label={t('components.create-stack-form.submit-aria')}
          className='flex size-max items-center gap-2 rounded-lg bg-lime-600 p-2 text-white hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700'
          disabled={disableForm}
          type='submit'
        >
          <Save className='size-7' />
          <span className='text-lg'>{t('components.create-stack-form.submit')}</span>
        </Button>
      </form>
    </Form>
  );
}
