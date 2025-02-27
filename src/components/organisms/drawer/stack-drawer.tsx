import type { Project, Stack } from '@prisma/client';
import type { Drawer as DrawerPrimitive } from 'vaul';

import { X } from 'lucide-react';
import * as React from 'react';

import { MessageDisplay } from '@/components/atoms/message-display';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { isDefined, isNotDefined } from '@/helpers/guards/is-defined';
import useTranslations from '@/hooks/use-translations';

/**
 * Component that renders an interactive drawer to display detailed information about a Stack.
 * The drawer can be triggered by the `triggerChild` and displays stack data along with related projects.
 * It also allows navigation to a specific site and preserves state or navigates back based on the provided `returnToSiteOnClose` property.
 * @param params - Component properties
 * @param params.stack - Stack data to be displayed in the drawer, including associated projects
 * @param params.associatedProjects - Associated projects with current stack
 * @param params.triggerChild - Optional React node acting as a trigger to open the drawer
 * @param params.drawerProps - Optional props for controlling the DrawerPrimitive component, such as open state, close behavior, etc
 * @param params.returnToSiteOnClose - Optional configuration for URL navigation when the drawer is closed
 * @param params.returnToSiteOnClose.site - The URL to navigate to when the drawer is closed
 * @param params.returnToSiteOnClose.keepState - Flag to indicate if the application state should be preserved when navigating to `site`
 * @returns A StackDrawer component.
 */
export function StackDrawer({
  stack,
  associatedProjects,
  triggerChild,
  drawerProps,
  returnToSiteOnClose,
}: {
  stack: Stack;
  associatedProjects: Project[];
  triggerChild?: React.ReactNode;
  drawerProps?: React.ComponentProps<typeof DrawerPrimitive.Root>;
  returnToSiteOnClose?: {
    site: string;
    keepState: boolean;
  };
}) {
  const { t } = useTranslations();

  const handleDrawerClose = () => {
    // Call the onClose callback if defined
    drawerProps?.onClose?.();

    if (isNotDefined(returnToSiteOnClose)) {
      return;
    }

    // Keep state means the application state should be preserved when navigating back to the site
    if (returnToSiteOnClose.keepState) {
      history?.pushState?.(null, '', returnToSiteOnClose.site);

      return;
    }

    window?.location?.assign?.(returnToSiteOnClose.site);
  };

  return (
    <Drawer {...drawerProps} onClose={handleDrawerClose}>
      <DrawerTrigger asChild>{triggerChild}</DrawerTrigger>
      <DrawerContent className='overflow-y-auto overflow-x-hidden px-6 py-2'>
        <section className='space-y-4'>
          {/* Header with the stack logo and name */}
          <div className='relative flex items-center space-x-2'>
            <img
              alt={`${stack.name} stack logo`}
              className='aspect-square size-10 rounded-sm'
              src={stack.iconUrl}
            />
            <h3 className='text-4xl font-bold'>{stack.name}</h3>
            <DrawerClose className='absolute right-0 top-0 p-2'>
              <X />
            </DrawerClose>
          </div>

          {/* Stack description (if defined) */}
          {isDefined(stack.description) && (
            <article>
              <h4 className='text-lg font-bold underline underline-offset-2'>
                {t('components.stack-drawer.description')}
              </h4>
              <p className='text-pretty indent-4'>
                <MessageDisplay message={stack.description} />
              </p>
            </article>
          )}

          {/* Related projects (if any) */}
          {associatedProjects.length > 0 && (
            <article className='space-y-1'>
              <h4 className='text-lg font-bold underline underline-offset-2'>
                {t('components.stack-drawer.related-projects')}
              </h4>
              <ul className='flex flex-col gap-2'>
                {associatedProjects?.map((project) => (
                  <li key={project.id}>
                    <a
                      className='flex items-center gap-2 rounded-md transition-all ease-linear hover:translate-x-2'
                      href={`/projects/${project.key}`}
                      rel='noreferrer'
                      target='_blank'
                    >
                      <img
                        alt={`${project.name} logo`}
                        className='size-14 rounded-full'
                        src={project.logoUrl}
                      />
                      <h5 className='whitespace-nowrap text-xl'>{project.name}</h5>
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
