"use client";

import { useGetMe } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { useState, useRef,useMemo, useEffect } from "react";

import { UpdateProfileData, UserProfile } from "../interfaces/profile.interface";
import { useUpdateAvatar, useUpdateCover, useUpdateProfile } from "@/src/features/user/profile/hooks/profile.hooks";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import TagGroup from "../components/TagGroup";
import { CalendarIcon, CameraIcon, DescriptionIcon, EditIcon, ReviewsIcon, ShareIcon, StarEmpty, StarFull, TuneSmallIcon, VerifiedIcon, VerifiedUserIcon } from "@/src/assets/icons";

function Stars({ count }: { count: number }) {
  return <div className="flex text-[#005440]">{Array.from({ length: 5 }, (_, i) => (i < count ? <StarFull key={i} /> : <StarEmpty key={i} />))}</div>;
}
const personalityOptions = [
  {
    value: "introvert",
    label: "Introvert",
  },
  {
    value: "ambivert",
    label: "Ambivert",
  },
  {
    value: "extrovert",
    label: "Extrovert",
  },
];

export default function ProfileManagement() {
  const { data, isLoading } = useGetMe();
  const initialProfile = data?.data;
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    fullName: "",
    bio: "",
    avatarUrl: "",
    coverUrl: "",
    age: 0,
    city: "",
    state: "",
    country: "",
    travelType: "",
    travelPersonality: "",
    isTraveling: false,
    interests: [],
    skills: [],
    languages: [],
    createdAt: new Date(),
  });
  useEffect(() => {
    if (data?.data) {
      setProfile(data.data);
    }
  }, [data]);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [editingBio, setEditingBio] = useState(false);

  const profileUpdate = useUpdateProfile();
  const avatarUpdate = useUpdateAvatar();
  const coverUpdate = useUpdateCover();

  const hasChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;

    return JSON.stringify(profile) !== JSON.stringify(initialProfile) || avatarFile !== null || coverFile !== null;
  }, [profile, initialProfile, avatarFile, coverFile]);

  const hasProfileChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;

    return JSON.stringify(profile) !== JSON.stringify(initialProfile);
  }, [profile, initialProfile]);
  const saving = profileUpdate.isPending || avatarUpdate.isPaused || coverUpdate.isPending
  const handleSave = async () => {
    const coverFormData = new FormData();
    const avatarFormData = new FormData();

    if (avatarFile) {
      avatarFormData.append("avatar", avatarFile);
      avatarUpdate.mutate(avatarFormData);
    }

    if (coverFile) {
      coverFormData.append("cover", coverFile);
      coverUpdate.mutate(coverFormData);
    }

    if (hasProfileChanges) {
      const payload: UpdateProfileData = {
        fullName: profile.fullName,
        bio: profile.bio!,
        isTraveling: profile.isTraveling,
        travelPersonalityCode: profile.travelPersonality!,
        interests: profile.interests.map((e) => capitalizeFirstLetter(e)),
        languages: profile.languages.map((e) => capitalizeFirstLetter(e)),
        skills: profile.skills.map((e)=> capitalizeFirstLetter(e)),
      };

      profileUpdate.mutate(payload)
    }

    setAvatarFile(null);
    setCoverFile(null);
  };
  if (isLoading) {
    return (
      <main className="ml-64 min-h-screen pb-32">
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main className="ml-64 mt-20 flex flex-1 flex-col overflow-y-auto">
      <div className="p-8 flex justify-center">
        <div className="max-w-[1000px] w-full space-y-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#bec9c3]/15">
            <div className="relative h-[280px] group">
              <img src={profile.coverUrl!} alt="Cover" className="w-full h-full object-cover" />
              <button onClick={() => coverInputRef.current?.click()} className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#005440] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white shadow-lg transition-all">
                <CameraIcon />
                Change cover
              </button>
              <input
                hidden
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  setCoverFile(file);

                  setProfile((prev) => ({
                    ...prev,
                    coverUrl: URL.createObjectURL(file),
                  }));
                }}
              />
            </div>

            <div className="px-8 pb-8 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                {/* Avatar */}
                <div className="relative -mt-16 group flex-shrink-0">
                  <img src={profile.avatarUrl!} alt={profile.fullName} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl" />
                  <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <CameraIcon />
                  </button>
                  <input
                    hidden
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      setAvatarFile(file);

                      setProfile((prev) => ({
                        ...prev,
                        avatarUrl: URL.createObjectURL(file),
                      }));
                    }}
                  />
                </div>

                {/* Status + actions */}
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <div className="flex items-center gap-4 bg-[#f1f4f1] px-4 py-2 rounded-xl">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#3f4944]/60">Profile Status</p>
                      <p className="text-xs font-bold text-[#005440]">{profile.isTraveling ? "Currently traveling" : "Not traveling"}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.isTraveling}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            isTraveling: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-[#e0e3e0] rounded-full peer peer-checked:bg-[#0f6e56] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    </label>
                  </div>
                  <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#e5e9e5] text-[#005440] hover:bg-[#e0e3e0] transition-colors shadow-sm">
                    <ShareIcon />
                  </button>
                  <button
                    disabled={!hasChanges || saving}
                    onClick={handleSave}
                    className={`
    px-6 py-2.5
    rounded-xl
    font-bold
    text-sm
    transition-all
    ${hasChanges ? "bg-[#005440] text-white hover:bg-[#004634]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
  `}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>{" "}
                </div>
              </div>

              {/* Name + handle */}
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <input
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="
    text-3xl
    font-extrabold
    bg-transparent
    border-b-2
    border-transparent
    focus:border-[#005440]
    outline-none
    w-full
    max-w-md
  "
                  />
                  <span className="text-[#005440]">
                    <VerifiedIcon filled={true} />
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-[#3f4944]/60">
                  <CalendarIcon /> Member since{" "}
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: "Trips", value: "6" },
              { label: "Avg Rating", value: "4.8", star: true },
              { label: "Buddies", value: "9" },
              { label: "Active", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className={`bg-white p-5 rounded-2xl border border-[#bec9c3]/15 flex flex-col items-center text-center ${stat.star ? "border-b-4 border-b-[#005440]" : ""}`}>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-[#005440]">{stat.value}</p>
                  {stat.star && <StarFull />}
                </div>
                <p className="text-[11px] text-[#3f4944]/70 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Management Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Bio + Reviews */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div className="bg-white p-8 rounded-3xl border border-[#bec9c3]/15">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 font-headline">
                    <span className="text-[#005440]">
                      <DescriptionIcon />
                    </span>{" "}
                    About Me
                  </h3>
                  <button onClick={() => setEditingBio((v) => !v)} className="flex items-center gap-2 text-[#005440] font-bold text-sm hover:underline">
                    <EditIcon /> {editingBio ? "Done" : "Edit"}
                  </button>
                </div>
                <div className="bg-[#f1f4f1]/50 rounded-xl p-6 border-2 border-dashed border-[#bec9c3]/30">
                  <textarea
                    value={profile.bio ?? ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    readOnly={!editingBio}
                    placeholder="Tell the world about your travel style, favorite destinations, and what makes you a great buddy..."
                    className={`w-full bg-transparent border-none focus:ring-0 outline-none leading-relaxed resize-none p-0 h-32 text-sm ${editingBio ? "text-[#181d1a]" : "text-[#3f4944] cursor-default"}`}
                  />
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white p-8 rounded-3xl border border-[#bec9c3]/15">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2 font-headline">
                    <span className="text-[#005440]">
                      <ReviewsIcon />
                    </span>{" "}
                    Traveler Reviews
                  </h3>
                  <div className="flex items-center gap-2 bg-[#c9eadb] px-3 py-1 rounded-full">
                    <StarFull />
                    <span className="text-sm font-bold text-[#4d6b5f]">4.8 (12)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Jenkins",
                      trip: "Bali Trip • Oct 2024",
                      rating: 5,
                      text: "Rohan is an amazing photographer and knows all the best sunrise spots. Super reliable and easy to hang out with!",
                      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtGUyZkDTkfAjrJ677-VR524rmezNLzlsV_zyq5WI-Ub5Q_nd31Hu3J_UYIY0PtTUpCW5uxcJ9rGMX-K66GkS7cK0XSU4yBNmf_dDvg6e2vGQxFSXjUR-Tv9VT1e4MpjAGfjhfZfLwRaFrbqGR6IyeEu394_8dT03tF9RJ2ocSZf_WkEioOTC-8mEWp3qXCVwWv1hYLQ9Pd8cr_NZArpyhquYUkauxe6HigdxbOcaG6X-odtdMfrSDAD8Xvq6JaQGLsBBJTrgaqvo",
                    },
                    {
                      name: "Marcus Chen",
                      trip: "Vietnam Loop • May 2024",
                      rating: 4,
                      text: "Great buddy for long motorcycle rides. Always has a positive attitude even when things get tough on the road.",
                      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYxRmmmrA_fvIW0wEiZwk41qg6_xvSTW3So-bJzxwmsV4OiuUotX4d9q6PX3VwImgh3sGgaq-SvYFDFznKfQJ4SGuaeaTKULzysTRvQDW5CXJlzVvATUBlZer6liD2kr_ludkRdhDpXnEsFxL14NiLkwEOa26Vut5hMSlF_W2S5cGycJmnQ8AypL_PCdxWa6krHMajThTGvwyE5CyyDV1d6WSFVHHv8f9A-WkMZKH47_Yyc7uPJYk_mWZ2Bjcp_0UcPb7CWwIKyKY",
                    },
                  ].map((review, i) => (
                    <div key={review.name} className={i === 0 ? "pb-6 border-b border-[#bec9c3]/10" : ""}>
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-bold">{review.name}</p>
                            <p className="text-[10px] text-[#3f4944]/60 font-medium uppercase tracking-wider">{review.trip}</p>
                          </div>
                        </div>
                        <Stars count={review.rating} />
                      </div>
                      <p className="text-sm text-[#3f4944] leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-3 rounded-xl bg-[#f1f4f1] text-[#005440] font-bold text-sm hover:bg-[#e5e9e5] transition-colors">View All 12 Reviews</button>
              </div>
            </div>

            {/* Right column: Preferences */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-[#bec9c3]/15">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-8 font-headline">
                  <span className="text-[#005440]">
                    <TuneSmallIcon />
                  </span>{" "}
                  Preferences
                </h3>
                <TagGroup
                  label="Languages"
                  tags={profile.languages}
                  onRemove={(tag: string) =>
                    setProfile((prev) => ({
                      ...prev,
                      languages: prev.languages.filter((item) => item !== tag),
                    }))
                  }
                  onAdd={(tag: string) =>
                    setProfile((prev) => ({
                      ...prev,
                      languages: [...prev.languages, tag],
                    }))
                  }
                />{" "}
                <TagGroup
                  label="Skills"
                  tags={profile.skills}
                  onRemove={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((item) => item !== tag),
                    }))
                  }
                  onAdd={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      skills: [...prev.skills, tag],
                    }))
                  }
                />{" "}
                <TagGroup
                  label="Interests"
                  tags={profile.interests}
                  onRemove={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      interests: prev.interests.filter((item) => item !== tag),
                    }))
                  }
                  onAdd={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      interests: [...prev.interests, tag],
                    }))
                  }
                />{" "}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]/60 mb-4">Travel Personality</p>

                  <div className="grid grid-cols-3 gap-2">
                    {personalityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setProfile((prev) => ({
                            ...prev,
                            travelPersonality: option.value,
                          }))
                        }
                        className={`
          py-3
          rounded-xl
          text-[12px]
          font-semibold
          text-[#3f4944]
          transition-all
          ${profile.travelPersonality === option.value ? "bg-[#c9eadb]" : "bg-[#f1f4f1] text-[#3f4944] hover:bg-[#e4ebe7]"}
        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-[#005440] p-8 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <VerifiedUserIcon />
                    </div>
                    <h4 className="font-black text-lg font-headline">Trust Level: Gold</h4>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">Your identity, phone, and email are fully verified. This badge helps you match with top-rated buddies.</p>
                  <button className="w-full py-2.5 rounded-xl bg-white text-[#005440] font-bold text-xs hover:bg-opacity-90 transition-all">Manage Verification</button>
                </div>
                <svg viewBox="0 0 24 24" className="absolute -bottom-10 -right-10 w-[200px] h-[200px] fill-current text-white/5 pointer-events-none rotate-12">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
