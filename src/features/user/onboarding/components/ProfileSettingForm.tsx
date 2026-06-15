"use client";
import React, { useEffect } from "react";
import { TagInput } from "./TagInput";
import { useState, useRef } from "react";
import { OnboardingProfileFormData, OnboardingProfileSchema } from "../validators/profile.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetProfile } from "../hooks/onboarding.hooks";
import { State, City } from "country-state-city";
import { useReverseGeoCode } from "@/src/hooks/api/location.hooks";
import CountriesList from "./CountriesList";
const GENDER_OPTIONS = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Non-binary",
    value: "non-binary",
  },
] as const;

const ProfileSettingForm = () => {
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<{
    state: string;
    city: string;
    stateCode: string;
  } | null>(null);

  const setProfile = useSetProfile();
  const [stateCode, setStateCode] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useReverseGeoCode();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(OnboardingProfileSchema),
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const gender = watch("gender");
  const skills = watch("travelSkills") ?? [];
  const languages = watch("languages") ?? [];
  const nationality = watch("nationality");
  const state = watch("state");

  const regions = nationality ? State.getStatesOfCountry(nationality) : [];
  const cities = nationality && stateCode ? City.getCitiesOfState(nationality, stateCode) : [];

  const onSubmit = (data: OnboardingProfileFormData) => {
    const formData = new FormData();

    formData.append("about", data.about);
    formData.append("dateOfBirth", data.dateOfBirth.toISOString());
    formData.append("nationality", data.nationality);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("gender", data.gender);

    formData.append("travelSkills", JSON.stringify(data.travelSkills));

    formData.append("languages", JSON.stringify(data.languages));

    if (data.image) {
      formData.append("image", data.image);
    }

    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }
    console.log(formData);
    setProfile.mutate(formData);
  };
  const handleAutoLocation = () => {
    setIsAutoFilling(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const res = await mutateAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setValue("nationality", res.data.countryCode);
      setPendingLocation({
        state: res.data.state,
        city: res.data.district,
        stateCode: res.data.stateCode,
      });
     setIsAutoFilling(false);
    }, console.error);
  };

  useEffect(() => {
    if (!pendingLocation) return;

    setValue("state", pendingLocation.state);
    setStateCode(pendingLocation.stateCode);
  }, [nationality]);
  useEffect(() => {
    if (!pendingLocation) return;
    setValue("city", pendingLocation.city);
    setPendingLocation(null);
  }, [stateCode]);
  return (
    <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-32">
        <div className="mb-10">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setValue("coverImage", file, {
                shouldValidate: true,
              });

              setCoverPreview(URL.createObjectURL(file));
            }}
          />

          <button type="button" onClick={() => coverInputRef.current?.click()} className="group relative w-full h-48 rounded-2xl overflow-hidden border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] transition-all">
            {coverPreview ? (
              <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#d8efe5] via-[#edf6f1] to-[#dfe8e3] flex flex-col items-center justify-center">
                <svg className="w-10 h-10 text-[#0f6e56]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h.01" />
                </svg>

                <span className="mt-3 text-sm font-bold text-[#0f6e56]">Upload Cover Photo</span>

                <span className="text-xs text-[#6f7a74] mt-1">Recommended: 1500 × 500</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 rounded-full text-sm font-bold text-[#181d1a] transition-all">Change Cover</span>
            </div>
          </button>
        </div>

        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/4">
          <div className="flex flex-col items-center space-y-4">
            <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Upload profile photo" className="relative group w-[120px] h-[120px] rounded-full bg-[#e5e9e5] flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] transition-colors">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                  <line x1="1" y1="8" x2="5" y2="8" />
                </svg>
              )}
              <div className="absolute inset-0 rounded-full bg-[#005440]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[#005440] font-bold text-xs">EDIT</span>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setValue("image", file, {
                  shouldValidate: true,
                });
                setPhotoPreview(URL.createObjectURL(file));
              }}
            />{" "}
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[#0f6e56] font-bold text-sm hover:underline">
              Upload photo
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">About you</label>
        <textarea rows={4} placeholder="I'm a budget backpacker..." {...register("about")} className="w-full bg-[#e0e3e0] border-none rounded-xl p-4 text-[#181d1a] placeholder:text-[#6f7a74]/60 focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all text-base outline-none resize-none" />
        {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none" />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}{" "}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Nationality</label>
          <select
            {...register("nationality")}
            onChange={(e) => {
              if (!isAutoFilling) {
                setValue("nationality", e.target.value);
                setValue("state", "");
                setValue("city", "");
                setStateCode("");
              } else {
                setValue("nationality", e.target.value);
              }
            }}
            className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none"
          >
            <option value="">Select nationality</option>
            <CountriesList />
          </select>

          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">State</label>
          <select
            {...register("state")}
            onChange={(e) => {
              const selectedRegion = regions.find((r) => r.name === e.target.value);
              if (!isAutoFilling) {
                setValue("state", e.target.value);
                setStateCode(selectedRegion?.isoCode ?? "");
                setValue("city", "");
              } else {
                setValue("state", e.target.value);
                setStateCode(selectedRegion?.isoCode ?? "");
              }
            }}
            className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none"
          >
            <option value="">Select region</option>

            {regions.map((region) => (
              <option key={region.isoCode} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>

          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">City</label>
          <select
            {...register("city")}
            onChange={(e) => {
              setValue("city", e.target.value);
            }}
            className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none"
          >
            <option value="">Select city</option>

            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>
        <div className="col-span-1 md:col-span-2 flex items-center">
          <button
            type="button"
            onClick={handleAutoLocation}
            disabled={isAutoFilling}
            className={`
      relative inline-flex items-center gap-2.5 px-5 py-2.5
      rounded-full text-[13px] font-semibold tracking-wide
      transition-all duration-200 active:scale-[0.97]
      ${isAutoFilling ? "bg-[#0f6e56]/12 text-[#0f6e56] cursor-not-allowed" : "bg-gradient-to-br from-[#0f6e56] to-[#1a8a6e] text-white shadow-[0_2px_12px_rgba(15,110,86,0.30)] hover:shadow-[0_4px_20px_rgba(15,110,86,0.40)] hover:scale-[1.03]"}
    `}
          >
            {/* Pulse ring */}
            {!isAutoFilling && <span className="absolute left-3 w-5 h-5 rounded-full bg-white/20 animate-ping pointer-events-none" />}

            {/* Icon */}
            {isAutoFilling ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.4" />
                <path d="M22 12a10 10 0 0 1-20 0" />
              </svg>
            ) : (
              <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
              </svg>
            )}

            <span className="relative z-10">{isAutoFilling ? "Detecting…" : "Use my current location"}</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Gender</label>
        <div className="flex flex-wrap gap-3">
          {GENDER_OPTIONS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() =>
                setValue("gender", g.value, {
                  shouldValidate: true,
                })
              }
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${gender === g.value ? "bg-[#0f6e56] text-white shadow-sm" : "border border-[#bec9c3]/30 text-[#3f4944] hover:bg-[#e5e9e5]"}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Travel Skills</label>
        <TagInput
          value={skills}
          placeholder="Add skill (e.g. Driving, Cooking)…"
          onChange={(value) =>
            setValue("travelSkills", value, {
              shouldValidate: true,
            })
          }
        />
        <p className="text-xs text-[#6f7a74]">Press Enter or comma to add a skill.</p>
        {errors.travelSkills && <p className="text-red-500 text-[12px]">{errors.travelSkills.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Languages</label>
        <TagInput
          value={languages}
          placeholder="Add language..."
          onChange={(value) =>
            setValue("languages", value, {
              shouldValidate: true,
            })
          }
        />
        <p className="text-xs text-[#6f7a74]">Press Enter or comma to add a language.</p>
        {errors.languages && <p className="text-red-500 text-[12px]">{errors.languages.message}</p>}
      </div>

      <div className="flex items-center justify-end pt-8 border-t border-[#bec9c3]/10">
        <button type="submit" className="w-40 h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md">
          Continue
        </button>
      </div>
    </form>
  );
};

export default ProfileSettingForm;
