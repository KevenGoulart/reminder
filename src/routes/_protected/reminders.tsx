import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { listReminders } from '#/services/reminder';
import { ReminderCard } from '#/components/reminder-card';

export const Route = createFileRoute('/_protected/reminders')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => listReminders(),
  });

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center pt-10">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-4xl text-white font-semibold">Seus lembretes</h1>

        {data?.data.map((reminder: any) => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))}
      </div>
    </div>
  );
}
