import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot';
import { Roles } from '../interfaces/user.interface';

const getRoles = async () => {
  const urlParams = new URLSearchParams();
  urlParams.append('limit', '100');
  urlParams.append('offset', '0');

  const { data } = await api.get<Roles[]>('/users/roles');
  return data;
};

const useRoles = () => {
  const rolesQuery = useQuery({
    queryFn: getRoles,
    queryKey: ['roles'],
    staleTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  return {
    //* Props
    rolesQuery,

    //! Getters

    //? Methods
  };
};

export default useRoles;
