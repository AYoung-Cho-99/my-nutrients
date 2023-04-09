import { APIReturnType } from "src/interface/api";
// import { EventCmtListType, EventWriteCmtType, EventWriteEventJoinType, EventCouponType, EventDeleteCmtType, EventBenefitParams, CheckPayParams, MakeRoomParams, EventFreeLectureType, EventAuthParams, EventJoinCheckType } from "@src/interface/event";
import ApiClient from "src/lib/ApiClient";
import { useMutation, useQuery, UseQueryOptions } from "react-query";



export const eventKeys = {
  all: ["event"] as const,
  info: (params: any) => [...eventKeys.all, 'info', params] as const,
};

export const fetchEventInfo = async (FOOD_CD: string): Promise<APIReturnType> => {
  const api = new ApiClient(FOOD_CD);
  const { data } = await api.get("");

  return data;
};

export const useEventInfo = (
    FOOD_CD: string,
  options?: UseQueryOptions<APIReturnType>,
) => {
  return useQuery<APIReturnType>(
    eventKeys.info(FOOD_CD),
    () => fetchEventInfo(FOOD_CD),
    options,
  );
};
