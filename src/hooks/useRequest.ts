import { useQuery } from 'react-query';

type QueryOptions = {
  refetchInterval?: number;
};

export const useRequest = (
  key: string | string[],
  request: () => Promise<any>,
  option?: QueryOptions
) => {
  return useQuery(key, request, { ...option });
};
