import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useBooking = () => {
    const queryClient = useQueryClient();
    const [searchParam] = useSearchParams();
    const filterValue = searchParam.get("status");

    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    const sortByRaw = searchParam.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");

    const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));
    const sortBy = { field, direction };
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }
    return { isLoading, bookings, error, count };
};
export default useBooking;
