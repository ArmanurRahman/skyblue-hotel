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

    const sortByRaw = searchParam.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");

    const sortBy = { field, direction };
    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });
    return { isLoading, bookings, error };
};
export default useBooking;
