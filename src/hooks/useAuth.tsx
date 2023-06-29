import { useEffect, useState } from 'react';
import { getAuthUser } from '@/utils/api';
import { useAuthContext } from '@/context/auth-context';

export function useAuth() {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAuthUser()
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoading };
}
