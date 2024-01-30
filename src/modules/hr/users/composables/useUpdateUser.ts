import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { api } from 'src/boot';
import { User, UserToUpdate } from '../interfaces/user.interface';

const updateUser = async (user: UserToUpdate) => {
  await api.put(`/users/${user.id}`, user);
};

const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);

  return id;
};

const restoreUser = async (id: number) => {
  await api.put(`/users/${id}/restore`);

  return id;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateData = (updatedUser: void) => {
    queryClient.invalidateQueries({ queryKey: ['users'], exact: false });

    queryClient.setQueryData(['users'], (oldQueryData?: { pages: { items: User[]; nextPage?: number }[] }) => {
      // Use optional chaining and nullish coalescing for cleaner code
      const pages = oldQueryData?.pages ?? [{ items: [], nextPage: 1 }];

      // Directly create the new first page and update the array
      const updatedFirstPage = { ...pages[0], items: [updatedUser, ...pages[0].items] };

      return { pages: [updatedFirstPage, ...pages.slice(1)] };
    });
  };

  const deleteData = (deletedUserId: number) => {
    queryClient.invalidateQueries({ queryKey: ['users'], exact: false });

    queryClient.setQueryData(['users'], (oldQueryData?: { pages: { items: User[]; nextPage?: number }[] }) => {
      // If there's no data, initialize the first page with the new user
      if (!oldQueryData?.pages) return { pages: [{ items: [], nextPage: 1 }] };

      // Otherwise, add the new user to the first page
      const firstPage = oldQueryData.pages[0];
      const updatedFirstPage = {
        ...firstPage,
        items: firstPage.items.filter((user) => user.id !== deletedUserId),
      };

      return { ...oldQueryData, pages: [updatedFirstPage, ...oldQueryData.pages.slice(1)] };
    });
  };

  const updateUserMutation = useMutation({ mutationFn: updateUser, onSuccess: updateData });

  const deleteUserMutation = useMutation({ mutationFn: deleteUser, onSuccess: deleteData });

  const restoreUserMutation = useMutation({ mutationFn: restoreUser, onSuccess: deleteData });

  return {
    updateUserMutation,
    deleteUserMutation,
    restoreUserMutation,
  };
};

export default useUpdateUser;
