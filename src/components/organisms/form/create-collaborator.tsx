import type {Collaborator} from "@prisma/client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Save} from "lucide-react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {isDefined} from "@/helpers/guards/is-defined";
import {useToast} from "@/hooks/use-toast";
import {
  CollaboratorCreateDefaultValues,
  CollaboratorCreateSchema,
} from "@/schemas/collaborator/create";
import {postCollaborator} from "@/services/collaborator/postCollaborator";

export function CreateCollaboratorForm({disableForm = false}: {disableForm?: boolean}) {
  const {toast} = useToast();
  const form = useForm<CollaboratorCreateSchema>({
    resolver: zodResolver(CollaboratorCreateSchema),
    defaultValues: CollaboratorCreateDefaultValues,
  });
  /**
   * `newCollaboratorId` stores the ID of the new collaborator, set when a collaborator is created.
   * The user is then redirected to the collaborator view.
   */
  const [newCollaboratorId, setNewCollaboratorId] = useState<Collaborator["id"]>();

  useEffect(() => {
    // Redirect happens inside `useEffect` to ensure it occurs after the component has rendered.
    // This prevents issues that can arise from trying to redirect before React updates the DOM.

    if (isDefined(newCollaboratorId)) {
      window.location.href = `/vault/views/collaborators/${newCollaboratorId}`;
    }
  }, [newCollaboratorId]);

  const onSubmit = async (values: CollaboratorCreateSchema) => {
    const response = await postCollaborator(values);

    if (response.success === true) {
      form.reset();
      toast({
        title: "Colaborador creado",
        description: response.message,
        className: "bg-green-500",
      });

      setNewCollaboratorId(response.data?.id);
    }

    if (response.success === false) {
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
