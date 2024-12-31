import {zodResolver} from "@hookform/resolvers/zod";
import {Save} from "lucide-react";
import {useForm} from "react-hook-form";

import {useToast} from "../../../hooks/use-toast";
import {
  CollaboratorCreateDefaultValues,
  CollaboratorCreateSchema,
} from "../../../schemas/collaborator/create";
import {postCollaborator} from "../../../services/collaborator/postCollaborator";
import {Button} from "../../ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";

export function CreateCollaboratorForm({disableForm = false}: {disableForm?: boolean}) {
  const {toast} = useToast();
  const form = useForm<CollaboratorCreateSchema>({
    resolver: zodResolver(CollaboratorCreateSchema),
    defaultValues: CollaboratorCreateDefaultValues,
  });

  const onSubmit = async (values: CollaboratorCreateSchema) => {
    const response = await postCollaborator(values);

    if (response.success) {
      form.reset();
      toast({
        title: "Colaborador creado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al crear colaborador",
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
            name="nickname"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input disabled={disableForm} placeholder="Nickname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUsername"
            render={({field}) => (
              <FormItem>
                <FormLabel>Usuario de Github</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="Usuario de Github"
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
            name="linkedinUsername"
            render={({field}) => (
              <FormItem>
                <FormLabel>Usuario de Linkedin</FormLabel>
                <FormControl>
                  <Input
                    disabled={disableForm}
                    placeholder="Usuario de Linkedin"
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
