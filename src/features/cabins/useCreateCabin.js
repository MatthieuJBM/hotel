import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      //It makes the query invalid so it will refetch the data
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset(); //It is one of useForm hook functions, so
      // it's not possible to use it here like this.
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createCabin };
}
