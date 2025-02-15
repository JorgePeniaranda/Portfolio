import { ChevronRight, Database } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ENV } from '@/constants/env';
import { DASHBOARD_NAVBAR_ITEMS } from '@/constants/navbar';
import { isDefined } from '@/helpers/guards/is-defined';

/**
 * Dashboard layout.
 * @param params - The component props
 * @param params.children - The children of the dashboard layout
 * @param params.breadcrumb - The breadcrumb items
 * @returns The dashboard layout
 */
export function DashboardLayout({
  children,
  breadcrumb,
}: {
  children?: React.ReactNode;
  breadcrumb?: Array<{
    title: string;
    url?: string;
  }>;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenuButton
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            size='lg'
          >
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
              <Database className='size-4' />
            </div>
            <div className='flex flex-col gap-0.5 leading-none'>
              <span className='font-semibold'>Panel de control</span>
              <span className='font-semibold'>v{ENV.appVersion}</span>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent className='gap-0'>
          {/* We create a collapsible SidebarGroup for each parent. */}
          {DASHBOARD_NAVBAR_ITEMS.navMain.map((item) => (
            <Collapsible
              key={item.title}
              defaultOpen
              className='group/collapsible'
              title={item.title}
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className='group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                >
                  <CollapsibleTrigger>
                    {item.title}{' '}
                    <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub className='gap-0'>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild isActive={item.isActive}>
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator className='mr-2 h-4' orientation='vertical' />
          {/* Show breadcrumb if is defined */}
          {isDefined(breadcrumb) &&
            breadcrumb?.length > 0 &&
            breadcrumb.map((item, index) => (
              <Breadcrumb key={item.title}>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumb.length - 1 && (
                    <BreadcrumbSeparator className='hidden md:block' />
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            ))}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
