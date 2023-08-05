import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBooking = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const filterValue = searchParam.get("status");

    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };
    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter],
        queryFn: () => getBookings({ filter }),
    });
    return { isLoading, bookings, error };
};
export default useBooking;
