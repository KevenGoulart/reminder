import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '#/store/auth';

export const Route = createFileRoute('/_protected')({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <Outlet />,
});
