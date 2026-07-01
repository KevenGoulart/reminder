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
    queryKey: ['deadbeats', reminder.id],
    queryFn: async () => listDeadbeats(reminder.id),
  });

  return (
    <div key={reminder.id} className="flex flex-col bg-slate-700 p-3 rounded-md mt-2 w-100">
      <h2 className="text-xl text-center text-white font-semibold">{reminder.title}</h2>
      <p className="text-white mx-auto">
        <strong>Dia:</strong> {formatDateTime(reminder.date)} /{' '}
        {reminder.recurring ? (
          <span className="text-green-500 font-semibold">Recorrente</span>
        ) : (
          <span className="text-red-600 font-semibold">Não recorrente</span>
        )}
      </p>

      <CreateDeadbeatModal reminderId={reminder.id} />
      <h2 className="text-slate-200 mt-2 text-xl pl-2">Caloteiros: </h2>
      {deadbeats?.data.relatedUsers.map((relatedUser: string) => (
        <div className="bg-slate-300 flex flex-col p-2 rounded-lg mt-2 max-w-[80%] mx-auto">
          <p key={relatedUser}>{relatedUser}</p>
        </div>
      ))}
    </div>
  );
}
