import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Collaborator, Project} from "@prisma/client";

import {Plus, X} from "lucide-react";
import {useForm} from "react-hook-form";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardHeader} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useToast} from "@/hooks/use-toast";
import {patchAddRelationWithCollaboratorFromProject} from "@/services/project/patchAddRelationWithCollaboratorFromProject";
import {patchDeleteRelationWithCollaboratorFromProject} from "@/services/project/patchDeleteRelationWithCollaboratorFromProject";

export function UpdateCollaboratorRelatedToProject({
  currentProject,
  associatedCollaborators,
  availableCollaborators,
  disableForm,
}: {
  currentProject: Project;
  associatedCollaborators: Collaborator[];
  availableCollaborators: Collaborator[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<RelationshipsSchema>({
    defaultValues: {
      idFrom: currentProject.id,
    },
  });

  const onAddCollaborator = async (values: RelationshipsSchema) => {
    const response = await patchAddRelationWithCollaboratorFromProject({
      idFrom: Number(values.idFrom),
      idTo: Number(values.idTo),
    });

    if (response.success === true) {
      form.reset();
      toast({
        title: "Colaborador relacionado con el proyecto",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (response.success === false) {
      toast({
        title: "Error al relacionar colaborador con el proyecto",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  const onRemoveCollaborator = async (collaboratorId: number) => {
    const response = await patchDeleteRelationWithCollaboratorFromProject({
      idFrom: currentProject.id,
      idTo: collaboratorId,
    });

    if (response.success === true) {
      toast({
        title: "Colaborador eliminado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (response.success === false) {
      toast({
        title: "Error al eliminar colaborador",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  return (
    <ul className="mt-4 flex flex-wrap gap-4">
      {associatedCollaborators?.map((collaborator) => (
        <li key={collaborator.id}>
          <Card className="my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
            <CardHeader className="relative flex items-center gap-2">
              <Button
                aria-label="eliminar relacion"
                className="absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                disabled={disableForm}
                onClick={() => onRemoveCollaborator(collaborator.id)}
              >
                <X />
                <span className="sr-only">eliminar relacion</span>
              </Button>
              <Avatar className="size-16 shrink-0">
                <AvatarImage
                  src={`https://avatars.githubusercontent.com/${collaborator.githubUsername}`}
                />
                <AvatarFallback>{collaborator.githubUsername}</AvatarFallback>
              </Avatar>
              <span className="text-lg capitalize">{collaborator.githubUsername}</span>
            </CardHeader>
          </Card>
        </li>
      ))}
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <button
              aria-label="Relacionar colaborador"
              className="my-5 flex aspect-square w-max flex-col items-center justify-center rounded-lg bg-zinc-300 p-6 shadow dark:bg-zinc-800"
              type="button"
            >
              <Plus className="size-20" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Relacionar colaborador</DialogTitle>
              <DialogDescription>
                Selecciona un colaborador para relacionar con el proyecto.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                className="space-y-8"
                id="relation-with-collaborator"
                onSubmit={form.handleSubmit(onAddCollaborator)}
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
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Seleccionar colaborador" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCollaborators.map((stack) => (
                                <SelectItem key={stack.id} value={String(stack.id)}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      alt={`${stack.nickname} logo`}
                                      className="size-6"
                                      src={`https://avatars.githubusercontent.com/${stack.githubUsername}`}
                                    />
                                    <span>{stack.nickname}</span>
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
                form="relation-with-collaborator"
                type="submit"
                typeof="submit"
              >
                Relacionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  );
}
