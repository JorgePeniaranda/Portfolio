import {zodResolver} from "@hookform/resolvers/zod";
import {StackCategory, StackType, type Stack} from "@prisma/client";
import {Save} from "lucide-react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

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
import {isDefined} from "@/helpers/guards/is-defined";
import {useToast} from "@/hooks/use-toast";
import {StackCreateDefaultValues, StackCreateSchema} from "@/schemas/stack/create";
import {postStack} from "@/services/stack/postStack";

export function CreateStackForm({disableForm = false}: {disableForm?: boolean}) {
  const {toast} = useToast();
  const form = useForm<StackCreateSchema>({
    resolver: zodResolver(StackCreateSchema),
    defaultValues: StackCreateDefaultValues,
  });
  /**
   * `newProjectId` stores the ID of the new stack, set when a stack is created.
   * The user is then redirected to the stack view.
   */
  const [newStackId, setNewStackId] = useState<Stack["id"]>();

  useEffect(() => {
    // Redirect happens inside `useEffect` to ensure it occurs after the component has rendered.
    // This prevents issues that can arise from trying to redirect before React updates the DOM.

    if (isDefined(newStackId)) {
      window.location.href = `/vault/views/project/${newStackId}`;
    }
  }, [newStackId]);

  const onSubmit = async (values: StackCreateSchema) => {
    const response = await postStack(values);

    if (response.success === true) {
      form.reset();
      toast({
        title: "Stack creado",
        description: response.message,
        className: "bg-green-500",
      });

      if (isDefined(response?.data?.id)) {
        setNewStackId(response.data.id);
      }
    }

    if (response.success === false) {
      toast({
        title: "Error al crear stack",
        description: response.message,
        className: "bg-red-500",
      });
    }

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
            name="iconUrl"
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
          <span className="text-lg">Crear</span>
        </Button>
      </form>
    </Form>
  );
}
