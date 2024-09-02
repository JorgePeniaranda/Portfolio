import type { LucideIcon } from 'lucide-react'

import React from 'react'

import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../ui/breadcrumb'

//#region TYPES
export interface IBreadCrumb {
  label: string
  href?: string
}
//#endregion

//#region BREADCRUMB
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: IBreadCrumb[]
  Separator?: LucideIcon
}

export function Breadcrumb({ items, Separator, ...props }: BreadcrumbProps) {
  return (
    <UIBreadcrumb {...props}>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <React.Fragment key={item.label}>
              <CustomBreadcrumbItem item={item} />
              {index !== items.length - 1 && (
                <BreadcrumbSeparator>
                  {Separator ? <Separator /> : null}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </UIBreadcrumb>
  )
}
//#endregion

//#region BREADCRUMBITEM
interface CustomBreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  item: IBreadCrumb
}

export function CustomBreadcrumbItem({
  item,
  ...props
}: CustomBreadcrumbItemProps) {
  if (item.href !== undefined) {
    return (
      <BreadcrumbItem {...props}>
        <BreadcrumbLink asChild>
          <a href={item.href}>{item.label}</a>
        </BreadcrumbLink>
      </BreadcrumbItem>
    )
  }

  return (
    <BreadcrumbItem {...props}>
      <BreadcrumbPage>{item.label}</BreadcrumbPage>
    </BreadcrumbItem>
  )
}
//#endregion
