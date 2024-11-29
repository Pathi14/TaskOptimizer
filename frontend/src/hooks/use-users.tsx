import { axios } from '@/lib/axios';
import { User } from '@/lib/types';
import { useQuery } from 'react-query';

export function useUsers() {
  return useQuery<User[]>(['users'], () =>
    axios
      .get<
        {
          id: number;
          nom: string;
          adresse_mail: string;
        }[]
      >('/users')
      .then((res) =>
        res.data.map((u) => ({
          id: u.id,
          name: u.nom,
          email: u.adresse_mail,
        })),
      ),
  );
}
