import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project, Stack} from "@prisma/client";

import {Plus, X} from "lucide-react";
import {useForm} from "react-hook-form";

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
import {patchAddRelationWithStackFromProject} from "@/services/project/patchProjectAddAssociatedStack";
import {patchProjectRemoveAssociatedStack} from "@/services/project/patchProjectRemoveAssociatedStack";
import {safeReload} from "@/helpers/common/safe-reload";

export function UpdateStacksRelatedToProject({
  currentProject,
  associatedStacks,
  availableStacks,
  disableForm,
}: {
  currentProject: Project;
  associatedStacks: Stack[];
  availableStacks: Stack[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<RelationshipsSchema>({
    defaultValues: {
      idFrom: currentProject.id,
    },
  });

  const onAddStack = async (values: RelationshipsSchema) => {
    const response = await patchAddRelationWithStackFromProject({
      idFrom: Number(values.idFrom),
      idTo: Number(values.idTo),
    });

    if (response.success === true) {
      form.reset();
      toast({
        title: "Stack relacionado con el proyecto",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (response.success === false) {
      toast({
        title: "Error al relacionar stack con el proyecto",
        description: response.message,
        className: "bg-red-500",
      });
    }

    setTimeout(() => {
      safeReload();
    }, 1000);

    return;
  };

  const onRemoveStack = async (stackId: number) => {
    const response = await patchProjectRemoveAssociatedStack({
      idFrom: currentProject.id,
      idTo: stackId,
    });

    if (response.success === true) {
      toast({
        title: "Stack eliminado",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (response.success === false) {
      toast({
        title: "Error al eliminar stack",
        description: response.message,
        className: "bg-red-500",
      });
    }

    safeReload();

    return;
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-medium">Editar relaciones</h2>
      <div className="mx-5 mt-5">
        <h3 className="text-3xl font-medium">Stack</h3>
        <ul className="mt-4 flex flex-wrap gap-4">
          {associatedStacks?.map((stack) => (
            <li key={stack.id}>
              <Card className="my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800">
                <CardHeader className="relative">
                  <Button
                    aria-label="eliminar relacion"
                    className="absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                    disabled={disableForm}
                    onClick={() => onRemoveStack(stack.id)}
                  >
                    <X />
                    <span className="sr-only">eliminar relacion</span>
                  </Button>
                  <img
                    alt={`${stack.name} logo`}
                    className="size-20 rounded-lg"
                    src={stack.iconUrl}
                  />
                </CardHeader>
              </Card>
            </li>
          ))}
          <li>
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
                  <DialogTitle className="text-center">Relacionar stack</DialogTitle>
                  <DialogDescription>
                    Selecciona un stack para relacionar con el proyecto.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    className="space-y-8"
                    id="relation-with-stack"
                    onSubmit={form.handleSubmit(onAddStack)}
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
                                  <SelectValue placeholder="Seleccionar stack" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableStacks.map((stack) => (
                                    <SelectItem key={stack.id} value={String(stack.id)}>
                                      <div className="flex items-center gap-2">
                                        <img
                                          alt={`${stack.name} logo`}
                                          className="size-6"
                                          src={stack.iconUrl}
                                        />
                                        <span>{stack.name}</span>
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
                    form="relation-with-stack"
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
      </div>
    </div>
  );
}
