import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  //mutate is the callback function that we can connect with the button
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id), //instead we could also simply write: deleteCabin
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}

// The hook has not been placed into hooks folder, because
// that folder is used for hooks that can be used across
// multiple features. This one is just used in cabins feature.
