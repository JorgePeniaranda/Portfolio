import {ChevronDown, Slash} from "lucide-react";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../..//ui/dropdown-menu";

//#region TYPES
export interface IBreadCrumb {
  label: string;
  href?: string;
}
//#endregion

//#region BREADCRUMB COMPONENT
interface Props extends React.HTMLAttributes<HTMLElement> {
  items: IBreadCrumb[];
  Separator?: LucideIcon;
}

export function Breadcrumb({items, Separator, ...props}: Props) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {items.map((item, index) => {
          let Item;

          if (item.href !== undefined) {
            Item = function () {
              return (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <a href={item.href}>{item.label}</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            };
          } else {
            Item = function () {
              return (
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            };
          }

          return (
            <>
              <Item />
              {index !== items.length - 1 && (
                <BreadcrumbSeparator>{Separator ? <Separator /> : null}</BreadcrumbSeparator>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
//#endregion
