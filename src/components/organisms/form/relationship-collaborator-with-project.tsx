import type {Project, Stack} from "@prisma/client";
import type {RelationshipsSchema} from "../../../schemas/common/relationships";

import {Plus} from "lucide-react";
import {useForm} from "react-hook-form";

import {useToast} from "../../../hooks/use-toast";
import {patchAddRelationWithProjectFromCollaborator} from "../../../services/collaborator/patchAddRelationWithProjectFromStack";
import {Button} from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {Form, FormControl, FormField, FormItem} from "../../ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";

export function RelationshipCollaboratorWithProject({
  idFrom,
  availableProject,
  disableForm = false,
}: {
  idFrom: Stack["id"];
  availableProject: Pick<Project, "id" | "name" | "logoUrl">[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<RelationshipsSchema>({
    defaultValues: {
      idFrom,
    },
  });

  const onSubmit = async (values: RelationshipsSchema) => {
    const response = await patchAddRelationWithProjectFromCollaborator({
      idFrom: Number(values.idFrom),
      idTo: Number(values.idTo),
    });

    if (response.success) {
      form.reset();
      toast({
        title: "Proyecto relacionado con el colaborador",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al relacionar proyecto con el colaborador",
        description: response.message,
        className: "bg-red-500",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Relacionar stack"
          className="my-5 flex aspect-square w-max flex-col items-center justify-center rounded-lg bg-zinc-300 p-6 shadow dark:bg-zinc-800"
          type="button"
        >
          <Plus className="size-20" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Relacionar proyecto</DialogTitle>
          <DialogDescription>
            Selecciona un proyecto para relacionar con el colaborador.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-8"
            id="relation-with-project-from-collaborator"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-wrap gap-2">
              <FormField
                control={form.control}
                name="idTo"
                render={({field}) => (
                  <FormItem className="mx-auto">
                    <FormControl>
                      <Select
                        defaultValue={String(field.value)}
                        onValueChange={field.onChange}
                        {...field}
                        value={String(field.value)}
                      >
                        <SelectTrigger className="w-[180px]" disabled={disableForm}>
                          <SelectValue placeholder="Seleccionar proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProject.map((project) => (
                            <SelectItem key={project.id} value={String(project.id)}>
                              <div className="flex items-center gap-2">
                                <img
                                  alt={`${project.name} logo`}
                                  className="size-6"
                                  src={project.logoUrl}
                                />
                                <span>{project.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            className="bg-zinc-800 text-white hover:bg-zinc-700"
            disabled={disableForm}
            form="relation-with-project-from-collaborator"
            type="submit"
            typeof="submit"
          >
            Relacionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
