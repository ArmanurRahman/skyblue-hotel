import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

const useCheckout = () => {
    const queryClient = useQueryClient();

    const { mutate: checkout, inLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: () => toast.error("There was a error while checkout"),
    });
    return { checkout, isCheckingOut };
};

export default useCheckout;
