import useSWR from 'swr';
import axiosInstance from '../services/axiosInstance';

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const useJobs = (endpoint: string | null) => {
  const {data, isLoading, error} = useSWR(endpoint, fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  });

  return {
    jobs: data,
    isLoading: isLoading,
    isError: error,
  };
};