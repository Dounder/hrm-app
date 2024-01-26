import { useInfiniteQuery } from '@tanstack/vue-query';
import { computed, ref } from 'vue';

import { api } from 'src/boot';

const getUsers = async ({ pageParam = 0 }) => {
  const limit = 20;
  const offset = pageParam * limit; // Calculate the offset

  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await api.get('/users', { params });

  // Determine if it's the last page (if data.length is less than limit, it's likely the last page)
  const isLastPage = data.length < limit;

  return {
    items: data, // the actual data
    nextPage: isLastPage ? undefined : pageParam + 1, // return undefined if it's the last page, else increment pageParam
  };
};

const useUsers = () => {
  const page = ref(1);

  const {
    data: users,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['users', page.value],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: undefined,
  });

  const loadMore = () => {
    if (hasNextPage.value) fetchNextPage();
  };

  return {
    //* Props
    users: computed(() => users.value?.pages.flatMap((page) => page.items)),
    isFetching,
    isFetchingNextPage,
    isLoading,
    isPending,
    hasNextPage,
    //! Getters
    //? Methods
    loadMore,
  };
};

export default useUsers;
