import type {Project, Stack} from "@prisma/client";
import type {RelationshipsSchema} from "../../../schemas/common/relationships";

import {Plus} from "lucide-react";
import {useForm} from "react-hook-form";

import {useToast} from "../../../hooks/use-toast";
import {patchAddRelationWithStack} from "../../../services/project/patchAddRelationWithStack";
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

export function RelationshipProjectWithStack({
  idFrom,
  availableStacks,
  disableForm = false,
}: {
  idFrom: Project["id"];
  availableStacks: Pick<Stack, "id" | "name" | "iconUrl">[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();
  const form = useForm<RelationshipsSchema>({
    defaultValues: {
      idFrom,
    },
  });

  const onSubmit = async (values: RelationshipsSchema) => {
    const response = await patchAddRelationWithStack({
      idFrom: Number(values.idFrom),
      idTo: Number(values.idTo),
    });

    if (response.success) {
      form.reset();
      toast({
        title: "Stack relacionado con el proyecto",
        description: response.message,
        className: "bg-green-500",
      });
    }

    if (!response.success) {
      toast({
        title: "Error al relacionar stack con el proyecto",
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
          <DialogTitle className="text-center">Relacionar stack</DialogTitle>
          <DialogDescription>
            Selecciona un stack para relacionar con el proyecto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-8"
            id="relation-with-stack"
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
  );
}
