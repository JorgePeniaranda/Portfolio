import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Collaborator, Project} from "@prisma/client";

import {Plus} from "lucide-react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
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

export function RelationshipProjectWithCollaborator({
  idFrom,
  availableCollaborators,
  disableForm = false,
}: {
  idFrom: Project["id"];
  availableCollaborators: Pick<Collaborator, "id" | "nickname" | "githubUsername">[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<RelationshipsSchema>({
    defaultValues: {
      idFrom,
    },
  });

  const onSubmit = async (values: RelationshipsSchema) => {
    const response = await patchAddRelationWithCollaboratorFromProject({
      idFrom: Number(values.idFrom),
      idTo: Number(values.idTo),
    });

    if (response.success) {
      form.reset();
      toast({
        title: "Colaborador relacionado con el proyecto",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al relacionar colaborador con el proyecto",
        description: response.message,
        className: "bg-red-500",
      });
    }

    window.location.reload();

    return;
  };

  return (
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
  );
}
