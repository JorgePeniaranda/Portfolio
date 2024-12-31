import type {Collaborator, Project} from "@prisma/client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Save, X} from "lucide-react";
import {useForm} from "react-hook-form";

import {useToast} from "../../../hooks/use-toast";
import {CollaboratorUpdateSchema} from "../../../schemas/collaborator/update";
import {putCollaborator} from "../../../services/collaborator/putCollaborator";
import {Button} from "../../ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";
import {Card, CardHeader} from "../../ui/card";
import {patchDeleteRelationWithCollaboratorFromProject} from "../../../services/project/patchDeleteRelationWithCollaboratorFromProject";
import {patchDeleteRelationWithProjectFromCollaborator} from "../../../services/collaborator/patchDeleteRelationWithProjectFromStack";

import {RelationshipCollaboratorWithProject} from "./relationship-collaborator-with-project";

export function UpdateCollaboratorForm({
  defaultValues,
  disableForm,
  availableProjects,
}: {
  defaultValues: Collaborator & {
    project: Pick<Project, "id" | "name" | "logoUrl">[];
  };
  availableProjects: Pick<Project, "id" | "name" | "logoUrl">[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<CollaboratorUpdateSchema>({
    resolver: zodResolver(CollaboratorUpdateSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: CollaboratorUpdateSchema) => {
    const response = await putCollaborator(values);

    if (response.success) {
      form.reset();
      toast({
        title: "Colaborador actualizado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al actualizar colaborador",
        description: response.message,
        className: "bg-red-500",
      });
    }
  };

  const onRemoveProject = async (idProject: number) => {
    const response = await patchDeleteRelationWithProjectFromCollaborator({
      idFrom: defaultValues.id,
      idTo: idProject,
    });

    if (response.success) {
      toast({
        title: "Proyecto eliminado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al eliminar proyecto",
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
          <span className="text-lg">Guardar</span>
        </Button>
      </form>
      <div className="mt-10">
        <h2 className="text-3xl font-medium">Editar relaciones</h2>
        <div className="mx-5 mt-5">
          <h3 className="text-3xl font-medium">Proyectos</h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {defaultValues.project.map((project) => (
              <li key={project.id}>
                <Card className="my-5 flex flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                  <CardHeader className="relative flex items-center gap-2">
                    <Button
                      aria-label="eliminar relacion"
                      className="absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                      disabled={disableForm}
                      onClick={() => onRemoveProject(project.id)}
                    >
                      <X />
                      <span className="sr-only">eliminar relacion</span>
                    </Button>
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
            <li>
              <RelationshipCollaboratorWithProject
                availableProject={availableProjects}
                disableForm={disableForm}
                idFrom={defaultValues.id}
              />
            </li>
          </ul>
        </div>
      </div>
    </Form>
  );
}
