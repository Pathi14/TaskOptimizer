import { AppSidebar } from '@/components/app-sidebar';
import { TaskCard } from '@/components/task-card';
import { TaskList } from '@/components/task-list';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ListFilter, Plus } from 'lucide-react';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center justify-between gap-2 px-8 bg-card w-full h-14 rounded-lg mt-2 mr-2">
            <div className="font-medium">Projet Sequoia</div>

            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src="https://i.pravatar.cc/300" />
              </Avatar>
              Paul-henry Ngounou
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="relative">
            <ListFilter className="absolute top-1/2 -translate-y-1/2 left-3" />
            <Input
              className="bg-card-light border-none max-w-96 pl-11 placeholder:text-white/40"
              placeholder="Rechercher dans les tâches"
            />
          </div>

          <div className="mt-5 flex items-start gap-3 overflow-auto">
            <TaskList title="Backlog" />

            <button>
              <div className="w-80 min-w-80 bg-card border-2 border-dashed border-card-light p-3 rounded-lg hover:bg-card-light hover:border-white/60">
                <div className="flex items-center gap-2">
                  <Plus /> <p>Nouvelle liste</p>
                </div>
              </div>
            </button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
