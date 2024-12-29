import type {Project, Stack} from "@prisma/client";

import * as React from "react";
import {X} from "lucide-react";
import {Drawer as DrawerPrimitive} from "vaul";

import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from "../../../components/ui/drawer";
import {isDefined, isNotDefined} from "../../../helpers/guards/is-defined";

/**
 * Component that renders an interactive drawer to display detailed information about a Stack.
 * The drawer can be triggered by the `triggerChild` and displays stack data along with related projects.
 * It also allows navigation to a specific site and preserves state or navigates back based on the provided `returnToSiteOnClose` property.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} [props.triggerChild] - Optional React node acting as a trigger to open the drawer.
 * @param {React.ComponentProps<typeof DrawerPrimitive.Root>} [props.drawerProps] - Optional props for controlling the DrawerPrimitive component, such as open state, close behavior, etc.
 * @param {Object} [props.returnToSiteOnClose] - Optional configuration for URL navigation when the drawer is closed.
 * @param {string} props.returnToSiteOnClose.site - The URL to navigate to when the drawer is closed.
 * @param {boolean} props.returnToSiteOnClose.keepState - Flag to indicate if the application state should be preserved when navigating to `site`.
 * @param {Stack & {projects: Pick<Project, "id" | "key" | "name" | "logoUrl">[]}} props.stack - Stack data to be displayed in the drawer, including associated projects.
 */
export function StackDrawer({
  triggerChild,
  stack,
  drawerProps,
  returnToSiteOnClose,
}: {
  triggerChild?: React.ReactNode;
  drawerProps?: React.ComponentProps<typeof DrawerPrimitive.Root>;
  returnToSiteOnClose?: {
    site: string;
    keepState: boolean;
  };
  stack: Stack & {
    projects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
  };
}) {
  const handleDrawerClose = () => {
    if (isDefined(returnToSiteOnClose)) {
      if (returnToSiteOnClose.keepState) {
        history.pushState(null, "", returnToSiteOnClose.site);

        return;
      }

      window.location.href = returnToSiteOnClose.site;
    }

    // If drawerProps is not defined, exit the function
    if (isNotDefined(drawerProps)) {
      return;
    }

    // If onClose is defined in drawerProps, call it to close the drawer
    if (isDefined(drawerProps.onClose)) {
      drawerProps.onClose();
    }
  };

  return (
    <Drawer {...drawerProps} onClose={handleDrawerClose}>
      <DrawerTrigger asChild>{triggerChild}</DrawerTrigger>
      <DrawerContent className="overflow-y-auto overflow-x-hidden px-6 py-2">
        <section className="space-y-4">
          {/* Header with the stack logo and name */}
          <div className="relative flex items-center space-x-2">
            <img
              alt={`${stack.name} stack logo`}
              className="aspect-square size-10 rounded-sm"
              src={stack.iconUrl}
            />
            <h3 className="text-4xl font-bold">{stack.name}</h3>
            <DrawerClose className="absolute right-0 top-0 p-2">
              <X />
            </DrawerClose>
          </div>

          {/* Stack description (if defined) */}
          {isDefined(stack.description) && (
            <article>
              <h4 className="font-bold underline underline-offset-2">Descripción:</h4>
              <p className="text-pretty indent-4">{stack.description}</p>
            </article>
          )}

          {/* Related projects (if any) */}
          {stack.projects.length > 0 && (
            <article className="space-y-1">
              <h4 className="font-bold underline underline-offset-2">Proyectos relacionados:</h4>
              <ul>
                {stack.projects.map((project) => (
                  <li key={project.id}>
                    <a
                      className="flex items-center transition-all ease-linear hover:translate-x-2"
                      href={`/projects/${project.key}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={`${project.name} logo`}
                        className="aspect-square size-14 rounded-sm"
                        src={project.logoUrl}
                      />
                      <h5 className="whitespace-nowrap text-xl">{project.name}</h5>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          )}
        </section>
      </DrawerContent>
    </Drawer>
  );
}
