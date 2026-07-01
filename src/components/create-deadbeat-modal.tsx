import z from 'zod';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { addDeadbeat } from '#/services/reminder';
import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  email: z.email('Email inválido'),
});

type FormData = z.infer<typeof schema>;

export function CreateDeadbeatModal({ reminderId }: { reminderId: string }) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addDeadbeat(data.email, reminderId);

      queryClient.invalidateQueries({ queryKey: ['deadbeats'] });

      toast('Caloteiro adicionado');
    } catch (error) {
      toast('Erro ao adicionar caloteiro');
    }

    await setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-slate-300 hover:bg-slate-400 text-slate-800 p-1 rounded-lg cursor-pointer max-w-40 mx-auto mt-2">
        Adicionar Caloteiro
      </DialogTrigger>
      <DialogContent className="bg-slate-500">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Adicione um caloteiro</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                className="bg-slate-200 text-slate-800 placeholder:text-slate-500"
                placeholder="Email do caloteiro"
                {...register('email')}
              />
              <Button className="flex mt-2 ml-auto" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando' : 'Adicionar'}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
