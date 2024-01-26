export const useConfig = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) throw new Error('VITE_API_URL is not defined');

  return {
    //* Props
    apiUrl,

    //! Getters

    //? Methods
  };
};

export default useConfig;
