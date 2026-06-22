"use client";

import { DestinationSuggestion, PlaceData, SuggestionInterface } from "../interfaces/interfaces";
import { useGetPlacesSuggestion } from "../hooks/onboarding.hooks";
import { useDebounce } from "@/src/hooks/debounce.hook";
import { useEffect, useState } from "react";
import { onboardingService } from "../services/onboarding.service";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (destination: DestinationSuggestion) => void;
}

export default function DestinationAutocomplete({ value, onChange, onSelect }: Props) {
  const debouncedSuggestion = useDebounce(value);
  const [isSelected, setIsSelected] = useState(false);
  const { data, isLoading: loading } = useGetPlacesSuggestion(debouncedSuggestion, !isSelected);
  const suggestion = !isSelected ? (data?.suggestions?.[0] ?? null) : null;
  const handleSelect = async (selected: SuggestionInterface) => {
    try {
      const placeId = selected.placePrediction.place;
      setIsSelected(true);
      onChange(selected.placePrediction.text.text);
      const place = await onboardingService.getPlaceDetails(placeId);
      const city = place.addressComponents?.find((c: PlaceData) => c.types.includes("locality"))?.longText || null;
      const state = place.addressComponents?.find((c: PlaceData) => c.types.includes("administrative_area_level_1"))?.longText || null;
      const country = place.addressComponents?.find((c: PlaceData) => c.types.includes("country"))?.longText;
      const countryCode = place.addressComponents?.find((c: PlaceData) => c.types.includes("country"))?.shortText;
      onSelect({
        placeId,
        displayName: place.formattedAddress || selected.placePrediction.text.text,

        city,
        state,
        country,
        countryCode,

        latitude: place.location.latitude,
        longitude: place.location.longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          setIsSelected(false);

          onChange(e.target.value);
        }}
        placeholder="Search destination..."
        className="w-full h-14 pl-12 pr-4 bg-[#e0e3e0] rounded-xl"
      />

      {loading && <div className="absolute top-full left-0 p-2 text-sm">Loading...</div>}

      {suggestion && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-72 overflow-auto">
          {
            <button key={suggestion.placePrediction.place} type="button" onClick={() => handleSelect(suggestion)} className="w-full text-left px-4 py-3 hover:bg-gray-100">
              {suggestion.placePrediction.text.text}
            </button>
          }
        </div>
      )}
    </div>
  );
}
