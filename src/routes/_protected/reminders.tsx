import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { listReminders } from '#/services/reminder';

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
          <div key={reminder.id} className="bg-slate-700 p-4 rounded-md mt-4 w-1/2">
            <h2 className="text-xl text-white font-semibold">{reminder.title}</h2>
            <p className="text-white">{new Date(reminder.date).toLocaleString()}</p>
            {reminder.recurring && <span className="text-green-500">Recorrente</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
