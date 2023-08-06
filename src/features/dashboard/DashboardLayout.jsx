import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export default function DashboardLayout() {
    const { bookings, isLoading: isLoading1 } = useRecentBookings();
    const {
        stays,
        isLoading: isLoading2,
        confirmStays,
        numDays,
    } = useRecentStays();
    const { cabins, isLoading: isLoading3 } = useCabin();

    if (isLoading1 || isLoading2 || isLoading3) {
        return <Spinner />;
    }

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />
            <div>Todays activity</div>
            <div>Chart stay duration</div>
            <DurationChart confirmStays={confirmStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}
