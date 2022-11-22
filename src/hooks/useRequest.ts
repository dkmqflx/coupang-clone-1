import { useQuery } from 'react-query';

type QueryOptions = {
  refetchInterval?: number;
  enabled?: boolean;
};

export const useRequest = (
  key: string | string[],
  request: () => Promise<any>,
  option?: QueryOptions
) => {
  return useQuery(key, request, { ...option });
};
