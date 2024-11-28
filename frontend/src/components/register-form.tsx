'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError } from '@/components/form-error';
import { useMutation } from 'react-query';
import { User } from '@/lib/types';
import { axios } from '@/lib/axios';
import { useRouter } from 'next/navigation';

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Ce champ est obligatoire' })
      .min(2, { message: 'Votre nom doit contenir au moins 2 caractères' }),
    email: z
      .string()
      .min(1, { message: 'Ce champ est obligatoire' })
      .email({ message: 'Veuillez entrer un email correct' }),
    password: z
      .string()
      .min(1, { message: 'Ce champ est obligatoire' })
      .min(6, {
        message: 'Votre mot de passe doit contenir au moins 6 caractères',
      }),
    confirmPassword: z.string().min(1, { message: 'Ce champ est obligatoire' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Les mots de passe ne sont pas identiques.',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: (
      payload: Pick<User, 'email' | 'name'> & {
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
      }>('/users/auth/signup', {
        nom: payload.name,
        adresse_mail: payload.email,
        mot_de_passe: payload.password,
      }),
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    const response = await register(data);
    const { user, accessToken } = response.data;

    console.log(user, accessToken);

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
        <CardTitle className="text-2xl text-center">S'inscrire </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Nom</Label>
            <Input
              className="bg-card-light"
              id="nom"
              type="text"
              placeholder="John"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormError>{form.formState.errors.name.message}</FormError>
            )}
          </div>

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

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirmer mot de passe</Label>
            </div>
            <Input
              className="bg-card-light"
              id="password"
              type="password"
              {...form.register('confirmPassword')}
            />
            {form.formState.errors.confirmPassword && (
              <FormError>
                {form.formState.errors.confirmPassword.message}
              </FormError>
            )}
          </div>

          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Avez-vous un compte?{''}
          <Link href="/login" className="underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
