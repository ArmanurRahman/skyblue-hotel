import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins } = useCabin();
    const [searchParams] = useSearchParams();

    if (isLoading) {
        return <Spinner />;
    }
    const filterValue = searchParams.get("discount") || "";
    let filteredCabin;

    if (filterValue === "all") {
        filteredCabin = cabins;
    }
    if (filterValue === "no-discount") {
        filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
    }
    if (filterValue === "with-discount") {
        filteredCabin = cabins.filter((cabin) => cabin.discount > 0);
    }
    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header role='row'>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={filteredCabin}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
