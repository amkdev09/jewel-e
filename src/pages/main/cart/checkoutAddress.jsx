import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../../services/orderService";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";

const Stepper = ({ active }) => {
  const steps = ["Address", "Gifting", "Payment"];
  return (
    <div className="flex items-center gap-4 text-[11px] text-[#9ca3af] mt-2">
      {steps.map((label, index) => {
        const isActive = active === index;
        const isCompleted = index < active;
        return (
          <div key={label} className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="flex-1 h-[2px] rounded-full bg-gradient-to-r from-[var(--primary-color-a)] to-[var(--primary-color-b)]"
              style={{ opacity: isActive || isCompleted ? 1 : 0.3 }}
            />
            <span
              className={`w-2 h-2 rounded-full ${isActive || isCompleted ? "bg-[var(--primary-color-a)]" : "bg-[#d1d5db]"
                }`}
            />
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className={isActive ? "text-[var(--primary-color-a)] font-inter-semibold" : ""}>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CheckoutAddress = () => {
  const [mode, setMode] = useState("home"); // 'home' | 'store'
  const isHome = mode === "home";
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { userData } = useAuth();

  const initialFirstName = userData?.name ? String(userData.name).split(" ")[0] : "";
  const initialLastName =
    userData?.name && String(userData.name).split(" ").length > 1
      ? String(userData.name).split(" ").slice(1).join(" ")
      : "";

  const [contact, setContact] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    mobile: userData?.phone || "",
  });

  const [shipping, setShipping] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [billingMode, setBillingMode] = useState("same");
  const [billing, setBilling] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    mobile: userData?.phone || "",
  });

  const handleSaveAndContinue = async () => {
    const name = `${contact.firstName} ${contact.lastName}`.trim() || userData?.name || "";
    const phone = contact.mobile || userData?.phone || "";

    const shippingAddress = {
      name,
      phone,
      pincode: shipping.pincode,
      state: shipping.state,
      city: shipping.city,
      addressLine1: shipping.addressLine1,
      addressLine2: shipping.addressLine2,
    };
    try {
      const res = await orderService.createOrderFromCart({ shippingAddress });
      if (!res?.success) {
        throw new Error(res?.message || "Failed to create order");
      }
      const order = res.data;
      try {
        localStorage.setItem("activeOrder", JSON.stringify(order));
      } catch {
        // ignore storage failures
      }
      navigate("/checkout/gifting");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create order. Please try again.";
      showSnackbar(message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter-regular">
      {/* Top bar */}
      <header className="w-full border-b border-[#f3e8ff] bg-[var(--primary-color-d)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-1 rounded-full hover:bg-[#f3f4f6]"
                aria-label="Back"
                onClick={() => navigate(-1)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-base md:text-lg font-inter-semibold text-[var(--primary-color-a)]">
                Address
              </h1>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="max-w-md w-full">
                <Stepper active={0} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6b7280]">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ecfdf5] text-emerald-600">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% SECURE
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8">
          {/* Left: address form */}
          <section className="space-y-6">
            {/* Delivery type tabs */}
            <div className="inline-flex gap-2">
              <button
                type="button"
                onClick={() => setMode("home")}
                className={`px-6 py-3 rounded-lg text-sm font-inter-semibold text-[var(--primary-color-a)] transition-all bg-[var(--primary-color-d)] border ${isHome
                  ? "border-[var(--primary-color-a)] shadow-sm"
                  : "border-transparent"
                  }`}
              >
                HOME DELIVERY
              </button>
              <button
                type="button"
                onClick={() => setMode("store")}
                className={`px-6 py-3 rounded-lg text-sm font-inter-semibold text-[var(--primary-color-a)] transition-all bg-[var(--primary-color-d)] border ${!isHome
                  ? "border-[var(--primary-color-a)] shadow-sm"
                  : "border-transparent"
                  }`}
              >
                STORE PICK-UP
              </button>
            </div>

            {isHome ? (
              <>
                {/* Shipping address – home delivery */}
                <div className="space-y-3">
                  <h2 className="text-sm font-inter-semibold text-[#111827]">Shipping Address</h2>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Address (Street, Area)"
                      value={shipping.addressLine1}
                      onChange={(e) =>
                        setShipping((prev) => ({ ...prev, addressLine1: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-white px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="Landmark (Optional)"
                      value={shipping.addressLine2}
                      onChange={(e) =>
                        setShipping((prev) => ({ ...prev, addressLine2: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-white px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-white px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={shipping.pincode}
                      onChange={(e) =>
                        setShipping((prev) => ({ ...prev, pincode: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-white px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping((prev) => ({ ...prev, state: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-white px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value="India"
                      readOnly
                      className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                {/* Address type */}
                <div className="space-y-2">
                  <p className="text-xs font-inter-semibold text-[#111827]">Address Type</p>
                  <div className="inline-flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-[#ede9fe] text-sm font-inter-semibold text-[#4b0f52]">
                      Home (7am–9pm)
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white border border-[#e5e7eb] text-sm font-inter-semibold text-[#6b7280]">
                      Office (10am–6pm)
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Store pick-up form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-inter-semibold text-[#111827]">
                      Find the nearest store for pick up
                    </p>
                    <div className="w-full h-11 rounded-xl border border-[#c4b5fd] bg-white px-4 flex items-center text-xs text-[#4b5563]">
                      <span className="mr-2 text-[#a855f7]">📍</span>
                      <input
                        type="text"
                        placeholder="Enter Pincode"
                        className="flex-1 h-full bg-transparent outline-none placeholder:text-[#9ca3af]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full h-11 rounded-xl border border-[#e5e7eb] bg-white text-xs font-inter-semibold text-[#4b0f52]"
                  >
                    CHANGE PICKUP POINT
                  </button>
                </div>
              </>
            )}

            {/* Billing Address / Contact section – common for both modes */}
            <div className="space-y-6">
              {/* Contact details */}
              <div className="space-y-3">
                <h3 className="text-sm font-inter-semibold text-[#111827]">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={contact.firstName}
                    onChange={(e) => setContact((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={contact.lastName}
                    onChange={(e) => setContact((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                  />
                </div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                  <div className="flex items-center justify-center px-3 h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] text-xs text-[#4b5563]">
                    IN +91
                  </div>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={contact.mobile}
                    onChange={(e) => setContact((prev) => ({ ...prev, mobile: e.target.value }))}
                    className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                  />
                </div>
              </div>

              {/* Billing address toggle */}
              <div className="space-y-2">
                <h3 className="text-sm font-inter-semibold text-[#111827]">Billing Address</h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setBillingMode("same")}
                    className={`w-full flex items-center justify-between h-11 px-4 rounded-xl border text-xs ${
                      billingMode === "same"
                        ? "border-[#a855f7] bg-[#f5f3ff] text-[#4b0f52]"
                        : "border-[#e5e7eb] bg-white text-[#6b7280]"
                    }`}
                  >
                    <span>Same as shipping address</span>
                    <span
                      className={`w-4 h-4 rounded-full border ${
                        billingMode === "same"
                          ? "border-[#a855f7] bg-[#a855f7]"
                          : "border-[#d1d5db] bg-white"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingMode("different")}
                    className={`w-full flex items-center justify-between h-11 px-4 rounded-xl border text-xs ${
                      billingMode === "different"
                        ? "border-[#a855f7] bg-[#f5f3ff] text-[#4b0f52]"
                        : "border-[#e5e7eb] bg-white text-[#6b7280]"
                    }`}
                  >
                    <span>Use a different billing address</span>
                    <span
                      className={`w-4 h-4 rounded-full border ${
                        billingMode === "different"
                          ? "border-[#a855f7] bg-[#a855f7]"
                          : "border-[#d1d5db] bg-white"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[10px] text-[#9ca3af]">
                  We will not send an invoice to the shipping address.
                </p>
              </div>

              {/* Billing address form – only when using different address */}
              {billingMode === "different" && (
                <div className="space-y-3">
                  <p className="text-xs font-inter-semibold text-[#4b0f52]">Address</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={billing.firstName}
                      onChange={(e) =>
                        setBilling((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={billing.lastName}
                      onChange={(e) =>
                        setBilling((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address (Street, Area)"
                    value={billing.addressLine1}
                    onChange={(e) =>
                      setBilling((prev) => ({ ...prev, addressLine1: e.target.value }))
                    }
                    className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                  />
                  <input
                    type="text"
                    placeholder="Landmark (Optional)"
                    value={billing.addressLine2}
                    onChange={(e) =>
                      setBilling((prev) => ({ ...prev, addressLine2: e.target.value }))
                    }
                    className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={billing.city}
                      onChange={(e) =>
                        setBilling((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={billing.pincode}
                      onChange={(e) =>
                        setBilling((prev) => ({ ...prev, pincode: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={billing.state}
                      onChange={(e) =>
                        setBilling((prev) => ({ ...prev, state: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                    <input
                      type="text"
                      placeholder="Country India"
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                      value="India"
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                    <div className="flex items-center justify-center px-3 h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] text-xs text-[#4b5563]">
                      IN +91
                    </div>
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={billing.mobile}
                      onChange={(e) =>
                        setBilling((prev) => ({ ...prev, mobile: e.target.value }))
                      }
                      className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Save button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveAndContinue}
                className="w-full h-11 rounded-xl text-sm font-inter-semibold text-white shadow-md"
                style={{
                  background:
                    "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)",
                }}
              >
                SAVE & CONTINUE
              </button>
            </div>
          </section>

          {/* Right: order summary skeleton */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 space-y-3">
              <h2 className="text-xs font-inter-semibold text-[#6b7280] uppercase tracking-wide">
                Order Summary
              </h2>
              <div className="flex gap-3">
                <div className="w-16 h-20 rounded-md bg-[#f9fafb]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-inter-semibold text-[#111827] truncate">
                    Product name
                  </p>
                  <p className="text-[11px] text-[#6b7280] mt-1">
                    Size: 18 | Qty: 1
                  </p>
                  <p className="mt-2 text-sm font-inter-semibold text-[#4b0f52]">
                    ₹46,723
                  </p>
                </div>
              </div>
              <div className="border-t border-[#f3f4f6] pt-2 space-y-1 text-xs text-[#4b5563]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹46,723</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping (Standard)</span>
                  <span className="text-emerald-500 font-inter-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] font-inter-semibold text-[#111827]">
                  <span>TOTAL COST</span>
                  <span>₹46,723</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 space-y-3">
              <p className="text-xs font-inter-semibold text-[#111827]">
                CONTACT US FOR ASSISTANCE
              </p>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-[#4b5563]">
                {["Call", "Whatsapp", "Chat"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="h-10 rounded-xl border border-[#e5e7eb] bg-[#f9fafb]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutAddress;

