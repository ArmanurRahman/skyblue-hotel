import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

const useCheckin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, inLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate("/");
        },
        onError: () => toast.error("There was a error while checking"),
    });
    return { checkin, isCheckingIn };
};

export default useCheckin;
