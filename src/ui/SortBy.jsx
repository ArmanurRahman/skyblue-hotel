import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get("sortBy") || "";
    const handleChange = (e) => {
        searchParam.set("sortBy", e.target.value);
        setSearchParam(searchParam);
    };
    return (
        <Select
            options={options}
            onChange={handleChange}
            type='white'
            value={sortBy}
        />
    );
}
