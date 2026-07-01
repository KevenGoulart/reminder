import { createFileRoute, Link } from '@tanstack/react-router';
import { CreateReminderModal } from '../../components/create-reminder-modal';

export const Route = createFileRoute('/_protected/home')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-slate-800 min-h-screen flex justify-center pt-6">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-4">
          <Link
            className="bg-slate-300 hover:bg-slate-400 min-h-20 min-w-56 text-xl flex items-center justify-center  text-slate-800 p-2 rounded-lg cursor-pointer"
            to="/reminders"
          >
            Ver lembretes criados
          </Link>

          <CreateReminderModal />
        </div>
      </div>
    </div>
  );
}
