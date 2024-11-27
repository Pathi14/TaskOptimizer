import { useProject } from '@/hooks/use-project';
import { useParams } from 'next/navigation';

export function useActiveProject() {
  const params = useParams();
  const projectId = params.projectId as string | undefined;

  return useProject(projectId);
}
