'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError } from '@/components/form-error';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { User } from '@/lib/types';
import { axios } from '@/lib/axios';
import { useRouter } from 'next/navigation';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Ce champ est obligatoire' })
    .email({ message: 'Veuillez entrer un email correct' }),
  password: z.string().min(1, { message: 'Ce champ est obligatoire' }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const { mutateAsync: login, error } = useMutation({
    onError: (e) => {
      form.setError('root', { message: 'Email ou mot de passe incorrect' });
    },
    mutationFn: (
      payload: Pick<User, 'email'> & {
        password: string;
      },
    ) =>
      axios.post<{
        user: {
          id: number;
          nom: string;
          adresse_mail: string;
        };
        accessToken: string;
      }>('/users/auth/signin', {
        adresse_mail: payload.email,
        mot_de_passe: payload.password,
      }),
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    const response = await login(data);
    const { user, accessToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user.id,
        name: user.nom,
        email: user.adresse_mail,
      }),
    );

    router.push('/');
  }

  return (
    <Card className="mx-auto max-w-sm w-96 bg-card border-none text-foreground ">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Se connecter </CardTitle>
        <CardDescription>
          Entrez votre email pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          {form.formState.errors.root && (
            <FormError>{form.formState.errors.root.message}</FormError>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-card-light"
              id="email"
              type="email"
              placeholder="m@example.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <FormError>{form.formState.errors.email.message}</FormError>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de Passe</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Mot de passe oublié?
              </Link>
            </div>
            <Input
              className="bg-card-light"
              id="password"
              type="password"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <FormError>{form.formState.errors.password.message}</FormError>
            )}
          </div>
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Avez-vous un compte?{''}
          <Link href="/register" className="underline">
            S'inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
