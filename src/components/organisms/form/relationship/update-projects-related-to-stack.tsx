import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project, Stack} from "@prisma/client";

import {Plus, X} from "lucide-react";
import {useState} from "react";
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
import {isDefined} from "@/helpers/guards/is-defined";
import {useToast} from "@/hooks/use-toast";
import {patchStackAddAssociatedProjects} from "@/services/stack/patchStackAddAssociatedProjects";
import {patchStackRemoveAssociatedProjects} from "@/services/stack/patchStackRemoveAssociatedProjects";
import {handleErrorWithToast} from "@/helpers/error/toast-handler";

export function UpdateProjectsRelatedToStack({
  currentStack,
  associatedProjects: initialAssociatedProjects,
  availableProject: initialAvailableProject,
  disableForm,
}: {
  currentStack: Stack;
  associatedProjects: Project[];
  availableProject: Project[];
  disableForm?: boolean;
}) {
  const {toast} = useToast();

  // Initialize local state for dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize local state for associated and available projects
  const [associatedProjects, setAssociatedProjects] =
    useState<Project[]>(initialAssociatedProjects);
  const [availableProject, setAvailableProject] = useState<Project[]>(initialAvailableProject);

  // Create a form to relate a project to the stack
  const form = useForm<RelationshipsSchema>({
    defaultValues: {
      idFrom: currentStack.id,
    },
  });

  const onAddProject = async (values: RelationshipsSchema) => {
    try {
      // Send request to associate the project to the stack
      await patchStackAddAssociatedProjects({
        idFrom: Number(values.idFrom),
        idTo: Number(values.idTo),
      });

      // If the request was successful, reset the form and show a success toast
      form.reset();
      toast({
        title: "Proyecto relacionado con el stack",
        description: "El proyecto ha sido relacionado con el stack.",
        className: "bg-green-500 text-black",
      });

      // Update local state for associated and available projects
      const findProject = availableProject.find((project) => project.id === Number(values.idTo));

      if (isDefined(findProject)) {
        setAssociatedProjects((prev) => [...prev, findProject]);
        setAvailableProject((prev) => prev.filter((project) => project.id !== Number(values.idTo)));
      }

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorWithToast({
        error,
        title: "No se pudo relacionar el proyecto",
        defaultErrorMessage: "Ocurrió un error al intentar relacionar el proyecto con el stack.",
        tryAgain: () => onAddProject(values),
      });
    }
  };

  const onRemoveProject = async (idProject: number) => {
    try {
      // Send request to dissociate the project with the stack
      await patchStackRemoveAssociatedProjects({
        idFrom: currentStack.id,
        idTo: idProject,
      });

      // If the request was successful, show a success toast
      toast({
        title: "Proyecto eliminado",
        description: "El proyecto ha sido eliminado del stack.",
        className: "bg-green-500 text-black",
      });

      // Update local state for associated and available projects
      const findProject = associatedProjects.find((project) => project.id === idProject);

      if (isDefined(findProject)) {
        setAvailableProject((prev) => [...prev, findProject]);
        setAssociatedProjects((prev) => prev.filter((project) => project.id !== idProject));
      }

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorWithToast({
        error,
        title: "No se pudo eliminar el proyecto",
        defaultErrorMessage: "Ocurrió un error al intentar eliminar el proyecto del stack.",
        tryAgain: () => onRemoveProject(idProject),
      });
    }
  };

  return (
    <ul className="mt-4 flex flex-wrap gap-4">
      {associatedProjects?.map((project) => (
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                Selecciona un proyecto para relacionar con el stack.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                className="space-y-8"
                id="relation-with-project-from-stack"
                onSubmit={form.handleSubmit(onAddProject)}
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
                form="relation-with-project-from-stack"
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
