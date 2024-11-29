import { User } from '@/lib/types';
import { useEffect, useState } from 'react';

export function useAuth() {
  const raw = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(
    raw ? (JSON.parse(raw) as User) : null,
  );

  useEffect(() => {
    const raw = localStorage.getItem('user');

    if (!raw) {
      setUser(null);
    } else {
      setUser(JSON.parse(raw) as User);
    }
  }, [localStorage.getItem('user')]);

  return { user, setUser };
}
