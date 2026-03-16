import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import RedditInput from "../../components/input/redditInput";
import RedditPhoneInput from "../../components/input/mobileNumber";
import { FaCheck } from "react-icons/fa6";
import authService from "../../services/authService";
import useSnackbar from "../../hooks/useSnackbar";
import RedditPasswordInput from "../../components/input/password";
import { MdOutlineFingerprint } from "react-icons/md";

// Pixel-perfect tokens (CaratLane reference)
const BG_PAGE = "#FFFFFF";
const ACCENT = "#A65EBA";
const ACCENT_LIGHT = "#E8D5EC";
const TEXT_MAIN = "#4A4A4A";
const TEXT_MUTED = "#666666";
const PLACEHOLDER = "#AAAAAA";
const WHATSAPP_BG = "rgb(229, 244, 224)";
const WHATSAPP_ICON_BG = "rgb(244, 254, 241)";
const FACEBOOK_BG = "#1877F2";

const LogoIcon = () => (
  <div className="sign-up-head">
    <p className="loader">
      <MdOutlineFingerprint />
    </p>
  </div>
);

const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#9dd980"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function normalizePhoneForApi(mobile) {
  const digits = (mobile || "").replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

const Signup = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const defaultCountryCode = "+91";

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("First name is required"),
    lastName: Yup.string().trim().required("Last name is required"),
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    mobile: Yup.string()
      .trim()
      .matches(/^[0-9]{10}$/, "Enter a valid 10 digit mobile number")
      .required("Mobile number is required"),
    gender: Yup.string().oneOf(
      ["male", "female", "other", ""],
      "Invalid gender",
    ),
    countryCode: Yup.string().default(defaultCountryCode),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions",
    ),
  });

  return (
    <div
      className="min-h-[calc(100vh-120px)] flex flex-col items-center px-4 py-10 box-border"
      style={{
        backgroundColor: BG_PAGE,
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        className="w-full flex flex-col items-center"
        style={{ maxWidth: "720px" }}
      >
        {/* Logo — 24px gap below */}
        <div className="flex justify-center mb-6">
          <LogoIcon />
        </div>

        {/* Title — 22px, semibold, 12px gap below */}
        <h1
          className="text-center font-semibold"
          style={{
            fontSize: "22px",
            color: TEXT_MAIN,
            lineHeight: 1.3,
            marginBottom: "12px",
          }}
        >
          Signup with CaratLane
        </h1>

        {/* Description — 14px, 32px gap below */}
        <p
          className="text-center"
          style={{
            fontSize: "14px",
            color: TEXT_MUTED,
            lineHeight: 1.6,
            marginBottom: "32px",
            maxWidth: "420px",
          }}
        >
          Unlock Best prices and become an insider for our exclusive launches &
          offers. Complete your profile and get ₹500 worth of xClusive Points
        </p>

        {/* Social login — 24px gap below */}
        <div
          className="flex items-center justify-center gap-6"
          style={{ marginBottom: "24px" }}
        >
          <button
            type="button"
            className="flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition-colors"
            style={{ width: "48px", height: "48px" }}
            aria-label="Sign up with Google"
          >
            <GoogleIcon />
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full border-0 shadow-sm hover:opacity-90 transition-opacity"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: FACEBOOK_BG,
            }}
            aria-label="Sign up with Facebook"
          >
            <FacebookIcon />
          </button>
        </div>

        {/* Or continue with — 32px gap below */}
        <div
          className="flex items-center gap-3 w-full"
          style={{ maxWidth: "400px", marginBottom: "32px" }}
        >
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: ACCENT_LIGHT }}
          />
          <span style={{ fontSize: "13px", color: ACCENT, fontWeight: 400 }}>
            Or continue with
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: ACCENT_LIGHT }}
          />
        </div>

        <Formik
          initialValues={{
            mobile: "",
            countryCode: defaultCountryCode,
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            password: "",
            termsAccepted: false,
          }}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (values, helpers) => {
            const { setSubmitting } = helpers;
            try {
              const genderForApi = values.gender?.trim() || "prefer_not_to_say";
              const payload = {
                name: `${values.firstName.trim()} ${values.lastName.trim()}`.trim(),
                email: values.email.trim(),
                countryCode: values.countryCode,
                phone: normalizePhoneForApi(values.mobile),
                password: values.password,
                gender: genderForApi,
              };

              const response = await authService.register(payload);

              if (response?.success === false) {
                const message =
                  response?.message || "Registration failed. Please try again.";
                showSnackbar(message, "error");
                return;
              }

              showSnackbar(
                "Registered successfully. Please log in.",
                "success",
              );
              navigate("/login");
            } catch (error) {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "Registration failed. Please try again.";
              showSnackbar(message, "error");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="w-full">
              {/* Form grid — 20px gap between rows, 16px between cols */}
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5 mb-6">
                <RedditPhoneInput
                  label="Mobile Number"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  defaultCountryCode={defaultCountryCode}
                  onCountryChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Mobile Number"
                  fullWidth={true}
                  error={Boolean(touched.mobile && errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                />
                <RedditInput
                  label="Enter Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Email"
                  fullWidth={true}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <RedditInput
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  fullWidth={true}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <RedditInput
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  fullWidth={true}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <RedditPasswordInput
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  fullWidth={true}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>

              {/* Gender — 24px gap below */}
              <div className="flex items-center gap-6 w-full mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={values.gender === "male"}
                    onChange={handleChange}
                    className="w-4 h-4"
                    style={{ accentColor: "var(--primary-color-b)" }}
                  />
                  <span style={{ fontSize: "14px", color: TEXT_MAIN }}>
                    Male
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={values.gender === "female"}
                    onChange={handleChange}
                    className="w-4 h-4"
                    style={{ accentColor: "var(--primary-color-b)" }}
                  />
                  <span style={{ fontSize: "14px", color: TEXT_MAIN }}>
                    Female
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={values.gender === "other"}
                    onChange={handleChange}
                    className="w-4 h-4"
                    style={{ accentColor: "var(--primary-color-b)" }}
                  />
                  <span style={{ fontSize: "14px", color: TEXT_MAIN }}>
                    Others
                  </span>
                </label>
              </div>

              {/* WhatsApp opt-in box — 24px gap below */}
              <div
                className="w-full rounded-[24px] px-4 py-3 flex items-start gap-3"
                style={{ backgroundColor: WHATSAPP_BG, marginBottom: "24px" }}
              >
                <div className="flex-shrink-0 mt-0.5 rounded-[6px] bg-[var(--primary-color-a)] p-[4px]">
                  <FaCheck size={10} color={"#fff"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--primary-color-a)] mb-1">
                    Opt for Whatsapp Support
                  </p>
                  <p className="text-xs font-regular leading-snug text-[var(--primary-color-a)]">
                    We will be sharing Delivery & precious order related
                    communication. Also provide you with an interactive whatsapp
                    support
                  </p>
                </div>
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center"
                  style={{ backgroundColor: WHATSAPP_ICON_BG }}
                >
                  <WhatsAppIcon />
                </div>
              </div>

              {/* Terms checkbox — 24px gap below */}
              <label className="flex items-start gap-3 w-full cursor-pointer mb-6">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={values.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded flex-shrink-0"
                  style={{ accentColor: ACCENT }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: TEXT_MUTED,
                    lineHeight: 1.5,
                  }}
                >
                  By continuing you acknowledge that you are at least 18 years
                  old and have read and agree to CaratLane&apos;s{" "}
                  <a
                    href="/terms"
                    className="underline"
                    style={{ color: ACCENT }}
                  >
                    terms and condition
                  </a>
                  &amp;
                  <a
                    href="/privacy"
                    className="underline"
                    style={{ color: ACCENT }}
                  >
                    privacy.policy.
                  </a>
                </span>
              </label>

              {/* Sign up button — 24px gap below */}
              <button
                type="submit"
                disabled={isSubmitting || !values.termsAccepted}
                className="w-full rounded-lg font-semibold text-white text-base transition-opacity hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(to right, rgb(222, 87, 229), rgb(136, 99, 251))",
                  height: "48px",
                  marginBottom: "24px",
                  borderRadius: "8px",
                  opacity: isSubmitting || !values.termsAccepted ? 0.6 : 1,
                }}
              >
                {isSubmitting ? "Signing you up..." : "SIGN ME UP"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Login link */}
        <p style={{ fontSize: "13px", color: TEXT_MUTED }}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold underline"
            style={{ color: ACCENT }}
          >
            LOG IN
          </Link>
        </p>
      </div>

      <style>{`input::placeholder { color: ${PLACEHOLDER}; }`}</style>
    </div>
  );
};

export default Signup;
