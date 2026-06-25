import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/reminders')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-slate-800 min-h-screen flex justify-center pt-10">
      <h1 className="text-4xl text-white font-semibold">Seus lembretes</h1>
    </div>
  );
}
