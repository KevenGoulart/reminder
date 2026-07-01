import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CreateReminderForm } from './create-reminder-form';

export function CreateReminderModal() {
  return (
    <Dialog>
      <DialogTrigger className="bg-slate-300 hover:bg-slate-400 min-h-20 min-w-56 text-xl flex items-center justify-center text-slate-800 p-2 rounded-lg cursor-pointer">
        Criar Lembrete
      </DialogTrigger>
      <DialogContent className="bg-slate-600">
        <DialogHeader>
          <DialogTitle className="text-slate-200">Crie um lembrete para seus caloteiros</DialogTitle>
          <DialogDescription>
            <CreateReminderForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
