import { listDeadbeats } from '#/services/reminder';
import { formatDateTime } from '#/lib/format-date';
import { CreateDeadbeatModal } from '#/components/create-deadbeat-modal';
import { useQuery } from '@tanstack/react-query';

type ReminderProps = {
  id: string;
  title: string;
  date: Date;
  recurring: boolean;
  relatedUsers: string[];
};

export function ReminderCard({ reminder }: { reminder: ReminderProps }) {
  const { data: deadbeats } = useQuery({
    queryKey: ['deadbeats'],
    queryFn: async () => listDeadbeats(reminder.id),
  });

  return (
    <div key={reminder.id} className="flex flex-col bg-slate-700 p-4 rounded-md mt-4 w-1/2">
      <h2 className="text-xl text-white font-semibold">{reminder.title}</h2>
      <p className="text-white">Dia: {formatDateTime(reminder.date)}</p>
      {reminder.recurring && <span className="text-green-500">Recorrente</span>}
      <CreateDeadbeatModal reminderId={reminder.id} />
      <h2 className="text-slate-200 mt-2 text-xl">Caloteiros: </h2>
      <div className="bg-slate-400 flex flex-col p-2 rounded-lg mt-2 max-w-[80%]">
        {deadbeats?.data.relatedUsers.map((relatedUser: string) => (
          <p key={relatedUser}>{relatedUser}</p>
        ))}
      </div>
    </div>
  );
}
