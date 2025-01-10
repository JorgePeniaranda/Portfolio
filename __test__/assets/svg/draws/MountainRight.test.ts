import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {expect, test} from "vitest";

import MountainRight from "@/assets/svg/draws/MountainRight.astro";

test("renders component with correct attributes", async () => {
  const container = await AstroContainer.create();

  // Generate random class and id for uniqueness
  const randomClass = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
  const randomId = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

  // Set CSS styles
  const style = "display: flex;";

  // Render the component with random attributes
  const result = await container.renderToString(MountainRight, {
    props: {
      class: randomClass,
      id: randomId,
      style,
    },
  });

  // Validate if the component's rendered output contains the correct attributes
  expect(result).toContain(`class="${randomClass}"`);
  expect(result).toContain(`id="${randomId}"`);
  expect(result).toContain(`style="${style}"`);
});
