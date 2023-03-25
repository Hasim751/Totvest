import { api } from "src/utils/axios";

export function useRefreshToken() {
  api.defaults.withCredentials = true;
  const refresh = async () => {
    try {
      const { data } = await api.post('/auth/refresh');
      return data;
    } catch (error) {
      return error;
    }
  };

  return refresh;
}
