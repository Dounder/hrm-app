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

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess(updatedUser) {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });

      queryClient.setQueryData(['users'], (oldQueryData?: { pages: { items: User[]; nextPage?: number }[] }) => {
        // If there's no data, initialize the first page with the new user
        if (!oldQueryData?.pages) return { pages: [{ items: [updatedUser], nextPage: 1 }] };

        // Otherwise, add the new user to the first page
        const firstPage = oldQueryData.pages[0];
        const updatedFirstPage = { ...firstPage, items: [updatedUser, ...firstPage.items] };

        return { ...oldQueryData, pages: [updatedFirstPage, ...oldQueryData.pages.slice(1)] };
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess(deletedUserId) {
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
    },
  });

  const restoreUserMutation = useMutation({
    mutationFn: restoreUser,
    onSuccess(restoredUserId) {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });

      queryClient.setQueryData(['users'], (oldQueryData?: { pages: { items: User[]; nextPage?: number }[] }) => {
        // If there's no data, initialize the first page with the new user
        if (!oldQueryData?.pages) return { pages: [{ items: [], nextPage: 1 }] };

        // Otherwise, add the new user to the first page
        const firstPage = oldQueryData.pages[0];
        const updatedFirstPage = {
          ...firstPage,
          items: firstPage.items.filter((user) => user.id !== restoredUserId),
        };

        return { ...oldQueryData, pages: [updatedFirstPage, ...oldQueryData.pages.slice(1)] };
      });
    },
  });

  return {
    //* Props
    updateUserMutation,
    deleteUserMutation,
    restoreUserMutation,
    //! Getters
    //? Methods
  };
};

export default useUpdateUser;
