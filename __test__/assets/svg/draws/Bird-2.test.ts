import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {expect, test} from "vitest";

import BirdComponent from "@/assets/svg/draws/Bird-2.astro";

test("renders component with correct attributes", async () => {
  const container = await AstroContainer.create();

  // Generar valores aleatorios para `id` y `class`
  const randomClass = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
  const randomId = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

  // Set CSS styles
  const style = "display: flex;";

  const result = await container.renderToString(BirdComponent, {
    props: {
      class: randomClass,
      id: randomId,
      style,
    },
  });

  // Comparar los atributos generados aleatoriamente
  expect(result).toContain(`class="${randomClass}"`);
  expect(result).toContain(`id="${randomId}"`);
  expect(result).toContain(`style="${style}"`);
});
