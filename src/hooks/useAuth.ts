import {useEffect, useState} from "react";
import {getAuthUser} from "@/utils/api";

export function useAuth() {
  const [ user, setUser ] = useState<User | undefined>(undefined);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    getAuthUser()
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  },[]);

  return { user, isLoading };
}