import { api } from 'src/boot';
import { Department } from '..';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const getDepartments = async () => {
  const { data } = await api.get<Department[]>('/employee/departments');
  return data;
};

const getPositionsByDepartment = async (departmentId: number) => {
  if (departmentId === 0) return Promise.resolve([]);
  const { data } = await api.get<Department[]>('/employee/positions', {
    params: { departmentId },
  });

  return data;
};

export const useEmployeeExtensions = () => {
  const departmentId = ref<number>(0);

  const getDepartmentsQuery = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  const getPositionsQuery = useQuery({
    queryKey: ['positions', departmentId],
    queryFn: () => getPositionsByDepartment(departmentId.value),
  });

  return {
    departmentId,
    getDepartmentsQuery,
    getPositionsQuery,
  };
};

export default useEmployeeExtensions;
