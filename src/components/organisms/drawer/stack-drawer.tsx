"use client";

import type {Stack} from "@prisma/client";

import * as React from "react";

import {Drawer, DrawerContent, DrawerTrigger} from "../../../components/ui/drawer";

export function DrawerDemo({triggerChild, stack}: {triggerChild: React.ReactNode; stack: Stack}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerChild}</DrawerTrigger>
      <DrawerContent>{stack.name}</DrawerContent>
    </Drawer>
  );
}
