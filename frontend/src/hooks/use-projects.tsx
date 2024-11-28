import { axios } from '@/lib/axios';
import { Project } from '@/lib/types';
import { useQuery } from 'react-query';

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () =>
      axios
        .get<
          {
            id: number;
            titre: string;
            description: string;
          }[]
        >('/projects')
        .then((res) => {
          return res.data.map((p) => ({
            id: p.id,
            title: p.titre,
            description: p.description,
          }));
        }),
  });
}
