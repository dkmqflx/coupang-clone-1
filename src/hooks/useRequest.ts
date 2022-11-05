import {
  QueryKey,
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from 'react-query';

export const useRequest = (
  key: QueryKey,
  request: QueryFunction,
  option: UseQueryOptions
) => {
  return useQuery(key, request, { ...option });
};
