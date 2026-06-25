import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginUser } from '#/services/user';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z
    .email({ message: 'Please enter a valid email address.' })
    .min(5, 'Email must be at least 5 characters.')
    .max(150, 'Email must be at most 150 characters.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(40, 'Password must be at most 40 characters.'),
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await loginUser(data.email, data.password);

      Cookies.set('token-re', response.data.accessToken, { expires: 7 });

      toast('Login feito com sucesso');

      navigate({ to: '/home' });
    } catch (error) {
      toast('Erro ao logar usuário');
    }
  }
  return (
    <div className="bg-slate-800 min-h-screen text-white gap-6">
      <div className="flex items-center justify-center flex-col gap-6 py-10">
        <h1 className="text-4xl font-bold">Login</h1>

        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Insira suas credencias para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-form-email">E-mail</FieldLabel>
                      <Input
                        {...field}
                        id="login-form-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="email@exemplo.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-form-password">Senha</FieldLabel>
                      <Input
                        {...field}
                        id="login-form-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="••••••"
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
            <p className="text-center mt-4 text-sm text-slate-700">
              Não tem uma conta?{' '}
              <Link className="underline" to={'/register'}>
                Cadastre-se
              </Link>
            </p>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal" className="justify-between">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit" form="login-form">
                Login
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
