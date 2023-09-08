import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    /* queryKey is what identifies each data.
           If later we would use query again on another page with this exact key
           then the data would be read from the cache. 
        */
    queryKey: ["cabins"],
    /* The actual query function. This function is responsible for fetching
           the data from the API. This function must return a promise. 
        */
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}
