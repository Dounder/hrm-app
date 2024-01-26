import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from 'src/boot';
import { NewUser, User } from '../interfaces/user.interface';

const addUser = async (user: NewUser) => {
  const { username, email, password, roles } = user;

  const { data } = await api.post<User>('/users', { username, email, password, roles });

  return data;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      queryClient.setQueryData(['users'], (oldQueryData?: { pages: { items: User[]; nextPage?: number }[] }) => {
        // If there's no data, initialize the first page with the new user
        if (!oldQueryData?.pages) return { pages: [{ items: [user], nextPage: 1 }] };

        // Otherwise, add the user to the first page
        return {
          ...oldQueryData,
          pages: [{ ...oldQueryData.pages[0], items: [user, ...oldQueryData.pages[0].items] }, ...oldQueryData.pages.slice(1)],
        };
      });
    },
  });

  return {
    //* Props
    createUserMutation,
    //! Getters
    //? Methods
  };
};

export default useCreateUser;
