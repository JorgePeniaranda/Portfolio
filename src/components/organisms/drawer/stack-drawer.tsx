import type {Project, Stack} from "@prisma/client";

import * as React from "react";
import {X} from "lucide-react";

import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from "../../../components/ui/drawer";
import {isDefined} from "../../../helpers/guards/is-defined";

/**
 * Componente que renderiza un Drawer interactivo para mostrar información detallada de un Stack.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.triggerChild - Nodo React que actúa como disparador para abrir el Drawer.
 * @param {Object} props.stack - Datos del Stack que se mostrarán en el Drawer.
 * @param {string} props.stack.name - Nombre del stack.
 * @param {string} props.stack.iconUrl - URL del ícono del stack.
 * @param {string} [props.stack.description] - Descripción opcional del stack.
 * @param {Array} props.stack.projects - Lista de proyectos relacionados con el stack.
 * @param {string} props.stack.projects[].id - Identificador único del proyecto.
 * @param {string} props.stack.projects[].key - Clave única del proyecto.
 * @param {string} props.stack.projects[].name - Nombre del proyecto.
 * @param {string} props.stack.projects[].logoUrl - URL del logo del proyecto.
 */
export function StackDrawer({
  triggerChild,
  stack,
}: {
  triggerChild: React.ReactNode;
  stack: Stack & {
    projects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
  };
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerChild}</DrawerTrigger>
      <DrawerContent className="overflow-y-auto overflow-x-hidden px-6 py-2">
        <section className="space-y-4">
          {/* Header con el logo y el nombre del stack */}
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

          {/* Descripción del stack (si está definida) */}
          {isDefined(stack.description) && (
            <article>
              <h4 className="font-bold underline underline-offset-2">Descripción:</h4>
              <p className="text-pretty indent-4">{stack.description}</p>
            </article>
          )}

          {/* Proyectos relacionados (si existen) */}
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
                        className="aspect-square w-14 rounded-sm"
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
