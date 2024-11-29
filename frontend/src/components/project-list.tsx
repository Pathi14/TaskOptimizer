import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/hooks/use-projects';
import { axios } from '@/lib/axios';
import { Project } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-card">
      <div className="flex items-center gap-2">
        <div className="font-medium">{project.title}</div>
      </div>
      <div className="text-sm">{project.description}</div>
    </div>
  );
}

const ProjectSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est obligatoire.' }),
});

export function ProjectList() {
  const { data, isLoading, error } = useProjects();
  const [isCreationModeEnabled, setCreationModeEnabled] = useState(false);
  const { mutateAsync: addProject } = useMutation({
    mutationFn: (payload: { name: string }) =>
      axios.post('/projects', { titre: payload.name }),
  });
  const queryClient = useQueryClient();

  function toggleCreationMode() {
    setCreationModeEnabled(!isCreationModeEnabled);
  }
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: '',
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!data || error) {
    return (
      <div>Erreur: {(error as Error).message || 'Une erreur est survenue'}</div>
    );
  }

  async function onSubmit(data: z.infer<typeof ProjectSchema>) {
    toggleCreationMode();
    await addProject(data);
    form.reset();
    queryClient.invalidateQueries(['projects']);
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {data.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <ProjectCard project={project} />
        </Link>
      ))}

      {isCreationModeEnabled && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            type="text"
            className="bg-card border-none h-14 rounded-lg"
            autoComplete="off"
            autoFocus
            {...form.register('name')}
          />

          <div className="mt-2">
            <Button
              type="submit"
              className="mr-2 bg-blue-700 hover:bg-blue-800"
              disabled={!form.formState.isValid}
            >
              Ajouter un projet
            </Button>

            <Button type="button" onClick={toggleCreationMode}>
              Annuler
            </Button>
          </div>
        </form>
      )}

      <Button
        className="bg-card border-2 border-dashed h-14 hover:bg-card-light"
        onClick={toggleCreationMode}
        disabled={isCreationModeEnabled}
      >
        <Plus /> Nouveau projet
      </Button>
    </div>
  );
}
