import {type Project, type Stack} from "@prisma/client";
import {Controls, MiniMap, ReactFlow, type Edge, type Node} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {useMemo} from "react";

import {devConsoleLog} from "../../../helpers/common/dev-console-log";

import {StackWithDrawerNode} from "./nodes/stack-with-drawer";

/**
 * Component to render a flow diagram of stacks categorized by type and category.
 *
 * @param {Object} props - Component properties.
 * @param {Array<Stack & {
 *   projects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
 *   relatedFrom: { toStackStack: Stack }[];
 *   relatedTo: { fromStackStack: Stack }[];
 * }>} props.stacks - List of stacks including their relationships and related projects.
 * @param {Array<string | null>} props.categories - List of categories for grouping stacks.
 */
export async function StackFlow({
  stacks,
  categories,
}: {
  stacks: Array<
    Stack & {
      projects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
      relatedFrom: {
        toStackStack: Stack;
      }[];
      relatedTo: {
        fromStackStack: Stack;
      }[];
    }
  >;
  categories: Array<string | null>;
}) {
  // Agrupar los stacks por categoría y tipo usando useMemo
  const groupedStacks = useMemo(() => {
    const categoryMap: Record<string, {stacks: Stack[]; types: Record<string, Stack[]>}> = {};

    stacks.forEach((stack) => {
      const category = stack.category || "Uncategorized"; // Categoría por defecto
      const type = stack.type || "Unknown"; // Tipo por defecto

      if (!categoryMap[category]) {
        categoryMap[category] = {stacks: [], types: {}};
      }

      // Agrupar por tipo dentro de cada categoría
      if (!categoryMap[category].types[type]) {
        categoryMap[category].types[type] = [];
      }

      categoryMap[category].stacks.push(stack);
      categoryMap[category].types[type].push(stack);
    });

    return categoryMap;
  }, [stacks]);

  // Generar los nodos para React Flow
  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [];

    // Añadir nodos para cada categoría
    Object.keys(groupedStacks).forEach((category, categoryIndex) => {
      // Nodo para la categoría
      nodes.push({
        id: `category-${category}`, // Usamos la categoría como ID del grupo
        type: "default",
        data: {
          label: category, // Nombre de la categoría
        },
        position: {x: 200 * categoryIndex, y: 100}, // Posición inicial de cada categoría
      });

      // Añadir nodos para cada tipo dentro de la categoría
      Object.keys(groupedStacks[category].types).forEach((type, typeIndex) => {
        // Nodo para el tipo
        nodes.push({
          id: `type-${category}-${type}`, // ID único para el tipo
          type: "default",
          data: {
            label: type, // Nombre del tipo (Framework, Language, etc.)
          },
          position: {
            x: 200 * categoryIndex,
            y: 200 + typeIndex * 150, // Posición relativa al grupo de categorías
          },
        });

        // Añadir nodos para cada stack dentro del tipo
        groupedStacks[category].types[type].forEach((stack, stackIndex) => {
          nodes.push({
            id: `stack-${stack.id}`, // ID único para el stack
            type: "StackWithIconNode",
            data: {
              label: "", // Solo mostramos el icono
              iconUrl: stack.iconUrl, // Mostramos el icono del stack
              stackData: stack, // Pasamos los datos del stack
            },
            position: {
              x: 200 * categoryIndex,
              y: 300 + typeIndex * 150 + stackIndex * 100, // Posición relativa al tipo
            },
          });
        });
      });
    });

    return nodes;
  }, [groupedStacks]);

  // Generar bordes (Edges) entre los stacks relacionados
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    // Crear bordes para las relaciones `relatedFrom`
    stacks.forEach((stack) => {
      stack.relatedFrom.forEach((related) => {
        if (related.toStackStack) {
          edges.push({
            id: `e${stack.id}-${related.toStackStack.id}`,
            source: `stack-${stack.id}`,
            target: `stack-${related.toStackStack.id}`,
            label: `${stack.name} -> ${related.toStackStack.name}`,
          });
        }
      });

      // Crear bordes para las relaciones `relatedTo`
      stack.relatedTo.forEach((related) => {
        if (related.fromStackStack) {
          edges.push({
            id: `e${related.fromStackStack.id}-${stack.id}`,
            source: `stack-${related.fromStackStack.id}`,
            target: `stack-${stack.id}`,
            label: `${related.fromStackStack.name} -> ${stack.name}`,
          });
        }
      });
    });

    return edges;
  }, [stacks]);

  return (
    <ReactFlow
      fitView
      connectOnClick={false}
      edges={initialEdges}
      nodeTypes={{
        StackWithIconNode: StackWithDrawerNode,
      }}
      nodes={initialNodes}
      onNodeClick={(event, node) =>
        devConsoleLog({
          message: `Node "${node.data.label}" clicked`,
          type: "log",
        })
      }
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}

// const initialNodes: Node[] = [
//   {
//     id: "hidden-1",
//     type: "input",
//     data: {label: "Node 1"},
//     position: {x: 250, y: 5},
//   },
//   {id: "hidden-2", data: {label: "Node 2"}, position: {x: 100, y: 100}},
//   {id: "hidden-3", data: {label: "Node 3"}, position: {x: 400, y: 100}},
//   {id: "hidden-4", data: {label: "Node 4"}, position: {x: 400, y: 200}},
// ];

// const initialEdges: Edge[] = [
//   {id: "hidden-e1-2", source: "hidden-1", target: "hidden-2"},
//   {id: "hidden-e1-3", source: "hidden-1", target: "hidden-3"},
//   {id: "hidden-e3-4", source: "hidden-3", target: "hidden-4"},
// ];
