import { axios } from '@/lib/axios';
import { Project } from '@/lib/types';
import { useQuery } from 'react-query';

export function useProject(projectId: string | Project['id'] | undefined) {
  return useQuery<Project | null>({
    queryKey: [projectId],
    queryFn: () =>
      !projectId
        ? null
        : axios
            .get<{
              id: number;
              titre: string;
              description: string;
            }>(`/projects/${projectId}`)
            .then((res) => ({
              id: res.data.id,
              title: res.data.titre,
              description: res.data.description,
            })),
  });
}
