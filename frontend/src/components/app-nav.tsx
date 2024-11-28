'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useActiveProject } from '@/hooks/use-active-project';

export function AppNav() {
  const activeProject = useActiveProject();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center justify-between gap-2 px-8 bg-card w-full h-14 rounded-lg mt-2 mr-2">
        <div className="font-medium">
          {activeProject && activeProject.data?.title}
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src="https://i.pravatar.cc/300" />
          </Avatar>
          Paul-henry Ngounou
        </div>
      </div>
    </header>
  );
}
