'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useActiveProject } from '@/hooks/use-active-project';
import { useAuth } from '@/hooks/use-auth';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AppNav() {
  const activeProject = useActiveProject();
  const { user, setUser } = useAuth();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center justify-between gap-2 px-8 bg-card w-full h-14 rounded-lg mt-2 mr-2">
        <div className="font-medium">
          {activeProject && activeProject.data?.title}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="bg-card-light">
                {user?.name[0]}
              </AvatarFallback>
            </Avatar>
            {user?.name}
          </div>

          <Button variant="ghost" onClick={handleLogout}>
            <LogOut /> Se déconnecter
          </Button>
        </div>
      </div>
    </header>
  );
}
