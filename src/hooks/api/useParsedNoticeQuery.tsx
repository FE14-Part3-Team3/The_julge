import { useMemo } from "react";
import { ReadonlyURLSearchParams } from 'next/navigation';
import { GetShopNoticesQuery } from '@/types/common'
import { toQueryString } from "@/lib/getQueryString";
import { useRouter } from "next/navigation";
import { useNoticeList } from "./useNoticeService";


export const useNoticeService = (
  defaultQuery: GetShopNoticesQuery,
  searchParams: ReadonlyURLSearchParams
) => {
  const parsedQuery = useParsedNoticeQuery(defaultQuery, searchParams);
  const queryResult = useNoticeList(parsedQuery);

  return {
    query: parsedQuery,
    ...queryResult,
  };
};

export const useParsedNoticeQuery = (
  defaultQuery: GetShopNoticesQuery,
  searchParams: ReadonlyURLSearchParams
) => {
  if (!searchParams) return defaultQuery;
  const parsedQuery = useMemo(() => {
    const obj: Record<string, any> = {};

    for (const [key, value] of searchParams.entries()) {
      if (value === "true") obj[key] = true;
      else if (value === "false") obj[key] = false;
      else if (!isNaN(Number(value))) obj[key] = Number(value);
      else obj[key] = value;
    }

    return {
      ...defaultQuery,
      ...obj,
    };
  }, [searchParams]);

  return parsedQuery;
};

export const useSetNoticeQuery = () => {
  const router = useRouter();

  const setQueryToURL = (query: Record<string, any>) => {
    const queryString = toQueryString(query);

    if (router) {
      router.push(`${queryString}`);
    }
  };

  return setQueryToURL;
};