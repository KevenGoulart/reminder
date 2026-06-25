import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

function getCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
}

export const Route = createFileRoute('/_protected')({
  beforeLoad: () => {
    const session = getCookie('token-re');

    if (!session) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <Outlet />,
});
