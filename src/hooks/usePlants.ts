import { useQuery } from "@tanstack/react-query";
import { fetchPlants } from "../api/fetchPlants";

export function usePlants() {
  return useQuery({
    queryKey: ["plants"],
    queryFn: fetchPlants,
    select: ({ data }) => data,
  });
}
