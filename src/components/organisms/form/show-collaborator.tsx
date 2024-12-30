import type {Colaborator} from "@prisma/client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Save} from "lucide-react";
import {useForm} from "react-hook-form";

import {CollaboratorUpdateSchema} from "../../../schemas/collaborator/update";
import {Button} from "../../ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";

export function ShowCollaboratorForm({defaultValues}: {defaultValues: Colaborator}) {
  const form = useForm<CollaboratorUpdateSchema>({
    resolver: zodResolver(CollaboratorUpdateSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex gap-2">
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
      </form>
    </Form>
  );
}