import { useGetAllCountries } from "@/src/hooks/api/lookups.hooks";
import React from "react";

const CountriesList = () => {
  const { data: countries, isLoading } = useGetAllCountries();
  if (isLoading) {
    return (
      <option>
        Loading...
      </option>
    );
  } else {
    return (
      <>
        {countries?.data?.map((opt: { code: string; name: string }) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </>
    );
  }
};

export default CountriesList;
