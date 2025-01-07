import type {Collaborator} from "@prisma/client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Pen} from "lucide-react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CollaboratorUpdateSchema} from "@/schemas/collaborator/update";

export function ShowCollaboratorForm({currentCollaborator}: {currentCollaborator: Collaborator}) {
  const form = useForm<CollaboratorUpdateSchema>({
    resolver: zodResolver(CollaboratorUpdateSchema),
    defaultValues: currentCollaborator,
  });

  const handleEdit = () => {
    window.location.href = `/vault/views/collaborators/${currentCollaborator.id}/edit`;
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-wrap gap-2">
          <FormField
            control={form.control}
            name="nickname"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Nickname" {...field} />
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
                    disabled
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
                    disabled
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
          className="size-max gap-2 bg-gray-500 p-2 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400"
          variant="outline"
          onClick={handleEdit}
        >
          <Pen className="size-5" />
          <span className="text-lg">Editar</span>
        </Button>
      </form>
    </Form>
  );
}
