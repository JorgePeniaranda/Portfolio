import type {Stack} from "@prisma/client";

import {DrawerDemo} from "../../drawer/stack-drawer";

export function StackWithDrawerNode({
  data,
}: {
  data: {label: string; iconUrl: string; stackData: Stack};
}) {
  return (
    <DrawerDemo
      stack={data.stackData}
      triggerChild={
        <div className="flex aspect-square items-center justify-center rounded-full border-2 border-stone-400 bg-white p-2 shadow-md">
          <img alt="dassda" className="h-7" src={data.iconUrl} />
          <span className="sr-only">{data.label}</span>
        </div>
      }
    />
  );
}
