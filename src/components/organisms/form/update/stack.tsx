import {zodResolver} from "@hookform/resolvers/zod";
import {StackCategory, StackType, type Stack} from "@prisma/client";
import {Save} from "lucide-react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
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
import {useToast} from "@/hooks/use-toast";
import {StackUpdateSchema} from "@/schemas/stack/update";
import {putStack} from "@/services/stack/putStack";
import {handleErrorWithToast} from "@/helpers/error/toast-handler";

export function UpdateStackForm({
  currentStack,
  disableForm,
}: {
  currentStack: Stack;
  disableForm?: boolean;
}) {
  const {toast} = useToast();

  // Create a form to update the stack
  const form = useForm<StackUpdateSchema>({
    resolver: zodResolver(StackUpdateSchema),
    defaultValues: currentStack,
  });

  const onSubmit = async (values: StackUpdateSchema) => {
    try {
      // Send request to update the stack
      await putStack(values);

      // If the request was successful, show a success toast
      toast({
        title: "Stack actualizado",
        description: "El stack ha sido actualizado exitosamente.",
        className: "bg-green-500",
      });
    } catch (error) {
      handleErrorWithToast({
        error,
        title: "No se pudo actualizar el stack",
        defaultErrorMessage: "Ha ocurrido un error al intentar actualizar el stack.",
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
    </Form>
  );
}
