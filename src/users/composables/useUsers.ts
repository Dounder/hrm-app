import { api } from 'src/boot';
import { Pagination } from 'src/shared';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/vue-query';
import { User } from '../interfaces/user.interface';
import { reactive, ref } from 'vue';

const getUsers = async (pagination: Pagination): Promise<User[]> => {
  const { limit = 30, offset = 0 } = pagination;

  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await api.get<User[]>('/users', { params });

  return data;
};

const useUsers = () => {
  const queryClient = useQueryClient();
  const pagination = reactive<Pagination>({ limit: 30, offset: 0 });
  const isLastPage = ref(false);

  const usersQuery = useQuery({
    queryKey: ['users', pagination],
    queryFn: () => getUsers(pagination),
    placeholderData: keepPreviousData,
  });

  const nextPage = () => {
    if (isLastPage.value) return;

    pagination.offset += pagination.limit;
    queryClient.prefetchQuery({
      queryKey: ['users', pagination],
      queryFn: () => getUsers(pagination),
    });
  };

  return {
    //* Props
    usersQuery,
    //! Getters
    //? Methods
    nextPage,
  };
};

export default useUsers;
