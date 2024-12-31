import type {Collaborator, Project} from "@prisma/client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Pen} from "lucide-react";
import {useForm} from "react-hook-form";

import {isNotDefined} from "../../../helpers/guards/is-defined";
import {CollaboratorUpdateSchema} from "../../../schemas/collaborator/update";
import {Button} from "../../ui/button";
import {Card, CardHeader} from "../../ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";

export function ShowCollaboratorForm({
  currentCollaborator,
}: {
  currentCollaborator: Collaborator & {
    associatedProjects: Pick<Project, "id" | "name" | "logoUrl">[];
  };
}) {
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
      <div className="mt-10">
        <h2 className="text-3xl font-medium">Editar relaciones</h2>
        <div className="mx-5 mt-5">
          <h3 className="text-3xl font-medium">Proyectos</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {currentCollaborator.associatedProjects?.map((project) => (
              <li key={project.id}>
                <Card className="my-5 flex flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative flex items-center gap-2">
                    <img
                      alt={`${project.name} logo`}
                      className="size-16 shrink-0"
                      src={project.logoUrl}
                    />
                    <span className="text-lg capitalize">{project.name}</span>
                  </CardHeader>
                </Card>
              </li>
            ))}
            {(isNotDefined(currentCollaborator.associatedProjects) ||
              currentCollaborator.associatedProjects?.length === 0) && (
              <p className="indent-2 text-lg text-gray-500">No hay proyectos asociados</p>
            )}
          </ul>
        </div>
      </div>
    </Form>
  );
}
