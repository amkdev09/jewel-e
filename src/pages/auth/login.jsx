import React, { useState } from "react";
import { Link } from "react-router-dom";

// Pixel-perfect tokens from design
const LOGO_COLOR = "#C0A1E0";

const LogoIcon = () => (
  <svg width="42" height="42" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="26" stroke={LOGO_COLOR} strokeWidth="2" fill="none" />
    <circle cx="28" cy="28" r="18" stroke={LOGO_COLOR} strokeWidth="1.5" fill="none" opacity="0.7" />
    <circle cx="28" cy="28" r="10" stroke={LOGO_COLOR} strokeWidth="1" fill="none" opacity="0.5" />
    <circle cx="28" cy="28" r="4" fill={LOGO_COLOR} opacity="0.8" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="#3B5998" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const canContinue = emailOrMobile.trim().length > 0 && termsAccepted;

  const handleLogin = () => {
    Cookies.set("emailOrMobile", emailOrMobile);
  };

  return (
    <div    >
      <div className="w-full flex flex-col items-center mx-auto pt-[100px] pb-[80px]" style={{ maxWidth: "288px" }}>
        {/* Logo — 50–60px, centered */}
        <div className="flex justify-center mb-6">
          <LogoIcon />
        </div>

        {/* Title — 24–28px bold, #5F338D */}
        <h1
          className="text-center font-inter-semibold text-lg text-[var(--primary-color-a)] mb-2"
        >
          Login to CaratLane
        </h1>

        {/* Description — 14–16px, #4A4A4A, centered */}
        <p
          className="text-center font-inter-regular text-sm text-[var(--primary-color-a)] mx-0"
          style={{
            marginBottom: "28px",
          }}
        >
          Login to unlock best prices and become an insider for our exclusive launches &amp; offers. Complete your profile and get ₹500 worth of xClusive Points.
        </p>

        {/* Input — Enter Mobile Number or Email */}
        <div
          className="w-full rounded-[30px] overflow-hidden mb-6"
          style={{
            backgroundColor: "rgb(246, 243, 249)",
            borderRadius: "6px",
          }}
        >
          <input
            type="text"
            placeholder="Enter Mobile Number or Email"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            className="w-full outline-none px-4 py-3 text-sm text-[var(--primary-color-a)] placeholder:text-[var(--primary-color-a)] rounded-[30px]"
          />
        </div>

        {/* Checkbox + legal text */}
        <label className="flex items-start gap-3 w-full cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="login-checkbox mt-0.5 flex-shrink-0"
            style={{
              width: "18px",
              height: "18px",
              minWidth: "18px",
              minHeight: "18px",
            }}
          />
          <span
            className="font-inter-regular text-sm text-[var(--primary-color-a)]"
          >
            By continuing you acknowledge that you are at least 18 years old and have read and agree to CaratLane&apos;s{" "}
            <a href="/terms" className="underline text-[var(--color-pink)]">terms and condition</a>
            {" "}and{" "}
            <a href="/privacy" className="underline text-[var(--color-pink)]">privacy_policy</a>
          </span>
        </label>

        {/* CONTINUE TO LOGIN — disabled state #E0E0E0, text #888888 */}
        <button
          type="button"
          disabled={!canContinue}
          className={`w-full h-[48px] mb-[28px] text-sm tracking-wide transition-all 
                    rounded-md font-inter-semibold
                    ${canContinue
              ? "bg-gradient-to-r from-[rgb(222,87,229)] to-[rgb(136,99,251)] text-white"
              : "bg-[rgb(236,236,236)] text-[rgb(172,172,172)]"
            }`}
        >
          CONTINUE TO LOGIN
        </button>

        {/* Social login — Google + Facebook circular */}
        <div
          className="flex items-center justify-center gap-5"
          style={{ marginBottom: "5px" }}
        >
          <button
            type="button"
            className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-50 shadow-md p-2"
            style={{
              backgroundColor: "#fff",
            }}
            aria-label="Login with Google"
          >
            <GoogleIcon />
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full border-0 transition-opacity hover:opacity-90 shadow-md p-2"
            style={{
              backgroundColor: "#fff",
            }}
            aria-label="Login with Facebook"
          >
            <FacebookIcon />
          </button>
        </div>

        {/* Sign-up prompt */}
        <p className="font-inter-regular text-sm text-[var(--primary-color-a)]">
          New to CaratLane?{" "}
          <Link to="/signup" className="text-[var(--color-pink)]">
            Create an Account
          </Link>
        </p>
      </div>
    </div >
  );
};

export default Login;
