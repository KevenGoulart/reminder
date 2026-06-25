import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CreateReminderForm } from './create-reminder-form';

export function CreateReminderModal() {
  return (
    <Dialog>
      <DialogTrigger className="bg-slate-300 hover:bg-slate-400 text-slate-800 p-2 rounded-lg cursor-pointer">
        Criar Lembrete
      </DialogTrigger>
      <DialogContent className="bg-slate-400">
        <DialogHeader>
          <DialogTitle>Crie um lembrete para seus amigos caloteiros</DialogTitle>
          <DialogDescription>
            <CreateReminderForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
