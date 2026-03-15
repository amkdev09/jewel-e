import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/slices/userAuthSlice";
import RedditInput from "../../../components/input/redditInput";

const defaultAddress = () => ({
  name: "",
  phone: "",
  pincode: "",
  state: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  isDefault: false,
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    gender: "",
    addresses: [defaultAddress()],
  });

  const fetchProfile = useCallback(async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await authService.getUser();
      if (res?.success && res?.data) {
        const data = res.data;
        setProfile(data);
        setForm({
          name: data.name ?? "",
          email: data.email ?? "",
          countryCode: data.countryCode ?? "+91",
          phone: data.phone ?? "",
          gender: data.gender ?? "",
          addresses:
            Array.isArray(data.addresses) && data.addresses.length > 0
              ? data.addresses.map((a) => ({
                  name: a.name ?? "",
                  phone: a.phone ?? "",
                  pincode: a.pincode ?? "",
                  state: a.state ?? "",
                  city: a.city ?? "",
                  addressLine1: a.addressLine1 ?? "",
                  addressLine2: a.addressLine2 ?? "",
                  isDefault: Boolean(a.isDefault),
                }))
              : [defaultAddress()],
        });
      }
    } catch (err) {
      const msg =
        err?.message || err?.response?.data?.message || "Failed to load profile.";
      showSnackbar(msg, "error");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, showSnackbar]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      navigate("/login", { state: { from: "/profile" } });
    }
  }, [isLoggedIn, loading, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (index, field, value) => {
    setForm((prev) => {
      const next = [...(prev.addresses || [])];
      next[index] = { ...(next[index] || defaultAddress()), [field]: value };
      return { ...prev, addresses: next };
    });
  };

  const addAddress = () => {
    setForm((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), defaultAddress()],
    }));
  };

  const removeAddress = (index) => {
    setForm((prev) => {
      const next = (prev.addresses || []).filter((_, i) => i !== index);
      return { ...prev, addresses: next.length ? next : [defaultAddress()] };
    });
  };

  const setDefaultAddress = (index) => {
    setForm((prev) => {
      const next = (prev.addresses || []).map((a, i) => ({
        ...a,
        isDefault: i === index,
      }));
      return { ...prev, addresses: next };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name?.trim() || undefined,
        email: form.email?.trim() || undefined,
        countryCode: form.countryCode?.trim() || undefined,
        phone: form.phone?.trim() || undefined,
        gender: form.gender || undefined,
        addresses: (form.addresses || [])
          .filter(
            (a) =>
              (a.addressLine1 || a.city || a.pincode || a.name || a.phone)
          )
          .map((a) => ({
            name: a.name || "",
            phone: a.phone || "",
            pincode: a.pincode || "",
            state: a.state || "",
            city: a.city || "",
            addressLine1: a.addressLine1 || "",
            addressLine2: a.addressLine2 || "",
            isDefault: Boolean(a.isDefault),
          })),
      };
      const res = await authService.updateProfile(payload);
      if (res?.success && res?.data) {
        setProfile(res.data);
        dispatch(setUserData(res.data));
        try {
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch {
          // ignore
        }
        setEditing(false);
        showSnackbar("Profile updated successfully.", "success");
      } else {
        throw new Error(res?.message || "Update failed");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to update profile.";
      showSnackbar(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        email: profile.email ?? "",
        countryCode: profile.countryCode ?? "+91",
        phone: profile.phone ?? "",
        gender: profile.gender ?? "",
        addresses:
          Array.isArray(profile.addresses) && profile.addresses.length > 0
            ? profile.addresses.map((a) => ({
                name: a.name ?? "",
                phone: a.phone ?? "",
                pincode: a.pincode ?? "",
                state: a.state ?? "",
                city: a.city ?? "",
                addressLine1: a.addressLine1 ?? "",
                addressLine2: a.addressLine2 ?? "",
                isDefault: Boolean(a.isDefault),
              }))
            : [defaultAddress()],
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9fc] flex items-center justify-center">
        <p className="text-[var(--primary-color-c)] font-inter-regular">Loading profile…</p>
      </div>
    );
  }

  if (!profile && !editing) {
    return (
      <div className="min-h-screen bg-[#faf9fc] flex flex-col items-center justify-center px-4">
        <p className="text-[var(--primary-color-c)] font-inter-regular mb-4">Could not load profile.</p>
        <button
          type="button"
          onClick={() => fetchProfile()}
          className="px-4 py-2 rounded-lg font-inter-semibold text-white"
          style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9fc] font-inter-regular">
      <header className="w-full border-b border-[#e5e7eb] bg-white sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-[#f3f4f6]"
              aria-label="Back"
              onClick={() => navigate(-1)}
            >
              <svg className="w-6 h-6 text-[#4b5563]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-inter-semibold text-[#231535]">
              {editing ? "Edit profile" : "My profile"}
            </h1>
            <div className="w-8" />
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 md:px-8 py-6 pb-12">
        {editing ? (
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-5 shadow-sm border border-[#e5e7eb]">
              <h2 className="text-sm font-inter-semibold text-[#4f3267] mb-4">Personal details</h2>
              <div className="grid gap-4">
                <RedditInput
                  label="Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Full name"
                />
                <RedditInput
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@example.com"
                />
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <RedditInput
                    label="Country code"
                    value={form.countryCode}
                    onChange={(e) => handleChange("countryCode", e.target.value)}
                    placeholder="+91"
                    className="w-20"
                  />
                  <RedditInput
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="10 digit mobile"
                  />
                </div>
                <div>
                  <label className="block text-xs font-inter-medium text-[#6b7280] mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full h-11 rounded-[10px] border border-[#e5e7eb] bg-[#f6f3f9] px-4 text-sm text-[#231535] outline-none focus:ring-2 focus:ring-[var(--primary-color-b)]"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-5 shadow-sm border border-[#e5e7eb]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-inter-semibold text-[#4f3267]">Addresses</h2>
                <button
                  type="button"
                  onClick={addAddress}
                  className="text-sm font-inter-semibold text-[var(--primary-color-a)]"
                >
                  + Add address
                </button>
              </div>
              <div className="space-y-5">
                {(form.addresses || []).map((addr, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-[#e5e7eb] bg-[#faf9fc] space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-inter-semibold text-[#4f3267]">Address {index + 1}</span>
                      {(form.addresses?.length || 0) > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAddress(index)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <RedditInput
                      placeholder="Label (e.g. Home, Office)"
                      value={addr.name}
                      onChange={(e) => handleAddressChange(index, "name", e.target.value)}
                    />
                    <RedditInput
                      placeholder="Phone"
                      value={addr.phone}
                      onChange={(e) => handleAddressChange(index, "phone", e.target.value)}
                    />
                    <RedditInput
                      placeholder="Pincode"
                      value={addr.pincode}
                      onChange={(e) => handleAddressChange(index, "pincode", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <RedditInput
                        placeholder="State"
                        value={addr.state}
                        onChange={(e) => handleAddressChange(index, "state", e.target.value)}
                      />
                      <RedditInput
                        placeholder="City"
                        value={addr.city}
                        onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                      />
                    </div>
                    <RedditInput
                      placeholder="Address line 1"
                      value={addr.addressLine1}
                      onChange={(e) => handleAddressChange(index, "addressLine1", e.target.value)}
                    />
                    <RedditInput
                      placeholder="Address line 2 (optional)"
                      value={addr.addressLine2}
                      onChange={(e) => handleAddressChange(index, "addressLine2", e.target.value)}
                    />
                    <label className="flex items-center gap-2 text-sm text-[#4b5563]">
                      <input
                        type="checkbox"
                        checked={addr.isDefault}
                        onChange={(e) =>
                          e.target.checked
                            ? setDefaultAddress(index)
                            : handleAddressChange(index, "isDefault", false)
                        }
                        className="rounded border-[#d1d5db]"
                      />
                      Default address
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl font-inter-semibold text-[#4f3267] border border-[#de57e5] bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl font-inter-semibold text-white disabled:opacity-60"
                style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-5 shadow-sm border border-[#e5e7eb]">
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-inter-semibold text-[#4f3267] mb-4">Personal details</h2>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="text-sm font-inter-semibold text-[var(--primary-color-a)]"
                >
                  Edit
                </button>
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-[#6b7280]">Name</dt>
                  <dd className="font-inter-medium text-[#231535]">{profile?.name || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[#6b7280]">Email</dt>
                  <dd className="font-inter-medium text-[#231535]">{profile?.email || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[#6b7280]">Phone</dt>
                  <dd className="font-inter-medium text-[#231535]">
                    {profile?.countryCode && profile?.phone
                      ? `${profile.countryCode} ${profile.phone}`
                      : profile?.phone || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6b7280]">Gender</dt>
                  <dd className="font-inter-medium text-[#231535] capitalize">
                    {profile?.gender || "—"}
                  </dd>
                </div>
                {(profile?.emailVerified || profile?.phoneVerified) && (
                  <div>
                    <dt className="text-[#6b7280]">Verified</dt>
                    <dd className="font-inter-medium text-[#231535]">
                      {[profile?.emailVerified && "Email", profile?.phoneVerified && "Phone"]
                        .filter(Boolean)
                        .join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="bg-white rounded-xl p-5 shadow-sm border border-[#e5e7eb]">
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-inter-semibold text-[#4f3267] mb-4">Addresses</h2>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="text-sm font-inter-semibold text-[var(--primary-color-a)]"
                >
                  Edit
                </button>
              </div>
              {Array.isArray(profile?.addresses) && profile.addresses.length > 0 ? (
                <ul className="space-y-4">
                  {profile.addresses.map((addr, i) => (
                    <li
                      key={i}
                      className="p-4 rounded-lg border border-[#e5e7eb] bg-[#faf9fc] text-sm"
                    >
                      {addr.isDefault && (
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-inter-semibold bg-[var(--primary-color-d)] text-[var(--primary-color-a)] mb-2">
                          Default
                        </span>
                      )}
                      <p className="font-inter-medium text-[#231535]">{addr.name || "Address"}</p>
                      <p className="text-[#6b7280]">{addr.phone}</p>
                      <p className="text-[#4b5563] mt-1">
                        {[addr.addressLine1, addr.addressLine2, addr.city, addr.state, addr.pincode]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#6b7280]">No addresses saved.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
