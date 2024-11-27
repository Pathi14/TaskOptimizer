import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm w-96 bg-card border-none text-foreground ">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Se connecter </CardTitle>
        <CardDescription>
        Entrez votre email pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input className="bg-card-light"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de Passe</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Mot de  passe oublié?
              </Link>
            </div>
            <Input className="bg-card-light" id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Avez-vous un compte?{""}
          <Link href="/register" className="underline">
            S'inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
