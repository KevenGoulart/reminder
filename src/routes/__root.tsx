import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import '../styles.css';
import { ReactQueryProvider } from '#/components/react-query-provider';
import { Toaster } from 'sonner';
import { Header } from '#/components/header';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ReactQueryProvider>
        <Header />
        <Outlet />
        <Toaster />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </ReactQueryProvider>
    </>
  );
}
