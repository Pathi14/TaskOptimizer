import { useProjects } from '@/hooks/use-projects';
import { Project } from '@/lib/types';
import Link from 'next/link';

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

export function ProjectList() {
  const { data, isLoading, error } = useProjects();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!data || error) {
    return (
      <div>Erreur: {(error as Error).message || 'Une erreur est survenue'}</div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {data.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
}
