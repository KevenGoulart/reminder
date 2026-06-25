'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { DayPicker } from './date-picker';
import { createReminder } from '#/services/reminder';
import { Switch } from './ui/switch';

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Título do lembrete deve ter pelo menos 1 caracter.')
    .max(32, 'Título do lembrete deve ter no máximo 32 caracteres.'),
  date: z.date(),
  recurring: z.boolean().optional(),
});

export function CreateReminderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      recurring: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createReminder(data.title, data.date, data.recurring);
      toast('Lembrete Criado');
    } catch (error) {
      toast('Erro ao criar lembrete');
    }
  }

  return (
    <Card className="w-full sm:max-w-md bg-slate-300">
      <CardHeader>
        <CardTitle>Criar Lembrete</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="reminder-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reminder-form-title">Título do Lembrete</FieldLabel>
                  <Input
                    {...field}
                    id="reminder-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Exemplo: Mensalidade netflix"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reminder-form-date">Data de vencimento</FieldLabel>
                  <DayPicker />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="recurring"
              control={form.control}
              render={({ fieldState, field }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reminder-form-recurring">Repetir</FieldLabel>
                  <Switch checked={field.value} onCheckedChange={field.onChange} id="reminder-form-recurring" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex justify-end">
          <Button type="submit" form="reminder-form">
            Criar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
