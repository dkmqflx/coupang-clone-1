import { useQuery } from 'react-query';

type requestOptionType = {
  enabled?: boolean;
};

export const useRequest = <TData>(
  key: string | string[],
  request: () => TData | Promise<TData>,
  option?: requestOptionType
) => {
  return useQuery(key, request, { ...option });
};
