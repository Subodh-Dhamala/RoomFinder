import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import api from "@/lib/axios";

export function useApi() {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      async (config: any) => {
        const token = await getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return api;
}