import { useQuery } from 'react-query';

type requestOptionType = {
  refetchInterval?: number;
};

export const useRequest = <TData>(
  key: string | string[],
  request: () => TData | Promise<TData>,
  option?: requestOptionType
) => {
  return useQuery(key, request, { ...option });
};
