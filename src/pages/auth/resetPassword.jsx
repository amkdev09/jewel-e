import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RedditInput from "../../components/input/redditInput";
import { loginUser } from "../../store/slices/userAuthSlice";
import { IoMdFingerPrint } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";

const LogoIcon = () => (
    <div className="sign-up-head" >
        <p className="loader"><IoMdFingerPrint /></p>
    </div>
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

const EyeIcon = ({ off = false }) => {
    if (!off) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 5c5.5 0 9.5 4.5 10 7-.5 2.5-4.5 7-10 7S2.5 14.5 2 12c.5-2.5 4.5-7 10-7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="3.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                />
            </svg>
        );
    }
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
                d="M3 3l18 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M10.6 10.6A2.8 2.8 0 0 0 12 15.8a2.8 2.8 0 0 0 2.8-2.8c0-.5-.1-1-.3-1.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M6.6 6.7C4.3 8.3 2.6 10.7 2.2 12c.5 2.5 4.4 7 9.8 7 1.6 0 3.1-.4 4.5-1.1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M9.8 5.4c.7-.2 1.5-.3 2.2-.3 5.5 0 9.5 4.5 10 7-.2.9-1 2.4-2.4 3.9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
};

const maskPhone = (value) => {
    const digits = String(value ?? "").replace(/\D/g, "");
    if (digits.length < 7) return value;
    const last4 = digits.slice(-4);
    return `+${digits.length > 10 ? digits.slice(0, digits.length - 10) : "91"} *****${last4}`;
};

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, isLoading } = useSelector((s) => s.userAuth ?? {});

    const [emailOrMobile, setEmailOrMobile] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [step, setStep] = useState("identifier"); // identifier | password
    const [showPassword, setShowPassword] = useState(false);

    const identifier = emailOrMobile.trim();
    const canContinue = identifier.length > 0 && termsAccepted;

    const identifierMeta = useMemo(() => {
        const looksLikeEmail = identifier.includes("@");
        const looksLikePhone = /^\+?\d[\d\s-]{7,}$/.test(identifier);
        return {
            primary: identifier,
            secondary: looksLikePhone ? maskPhone(identifier) : null,
            looksLikeEmail,
        };
    }, [identifier]);

    const goToPassword = () => {
        if (!canContinue) return;
        setShowPassword(false);
        setStep("password");
    };

    const changeIdentifier = () => {
        setStep("identifier");
    };

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .trim()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        enableReinitialize: true,
        onSubmit: async (values, helpers) => {
            try {
                const res = await dispatch(
                    loginUser({ identifier, password: values.password.trim() })
                );
                if (res?.meta?.requestStatus === "fulfilled") {
                    navigate("/");
                }
            } finally {
                helpers.setSubmitting(false);
            }
        },
    });

    return (
        <div    >
            <div className="w-full flex flex-col items-center mx-auto pt-[100px] pb-[80px]" style={{ maxWidth: "288px" }}>
                {/* Logo — 50–60px, centered */}

                <div className="flex justify-center mb-6">
                    {step === "identifier" ? (
                        <LogoIcon />
                    ) : (
                        <LogoIcon />
                    )}
                </div>

                {step === "identifier" ? (
                    <EnterEmailOrMobile
                        emailOrMobile={emailOrMobile}
                        setEmailOrMobile={setEmailOrMobile}
                        termsAccepted={termsAccepted}
                        setTermsAccepted={setTermsAccepted}
                        canContinue={canContinue}
                        onContinue={goToPassword}
                    />
                ) : (
                    <PasswordAndLogin
                        identifierMeta={identifierMeta}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        onChangeIdentifier={changeIdentifier}
                        status={status}
                        isLoading={isLoading}
                        error={error}
                        formik={formik}
                    />
                )}

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
                {step === "identifier" && (
                    <p className="font-inter-regular text-sm text-[var(--primary-color-a)]">
                        New to CaratLane?{" "}
                        <Link to="/signup" className="text-[var(--color-pink)]">
                            Create an Account
                        </Link>
                    </p>
                )}
            </div>
        </div >
    );
};

export default ResetPassword;


const EnterEmailOrMobile = ({
    emailOrMobile,
    setEmailOrMobile,
    termsAccepted,
    setTermsAccepted,
    canContinue,
    onContinue,
}) => {
    return (
        <>
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
            <RedditInput
                label="Enter Mobile Number or Email"
                value={emailOrMobile}
                id="emailOrMobile"
                onChange={(e) => setEmailOrMobile(e.target.value)}
            />

            {/* Checkbox + legal text */}
            <label className="flex items-start gap-3 w-full cursor-pointer mb-6 mt-[28px]">
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
                onClick={onContinue}
                disabled={!canContinue}
                className={`w-full h-[48px] mb-[28px] text-sm tracking-wide transition-all 
                    rounded-md font-inter-semibold cursor-pointer
                    ${canContinue
                        ? "bg-gradient-to-r from-[rgb(222,87,229)] to-[rgb(136,99,251)] text-white"
                        : "bg-[rgb(236,236,236)] text-[rgb(172,172,172)]"
                    }`}
            >
                CONTINUE TO LOGIN
            </button>
        </>
    )
}

const getErrorMessage = (error) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    return (
        error?.message ||
        error?.response?.data?.message ||
        error?.data?.message ||
        "Login failed. Please try again."
    );
};

const PasswordAndLogin = ({
    identifierMeta,
    showPassword,
    setShowPassword,
    onChangeIdentifier,
    status,
    isLoading,
    error,
    formik,
}) => {
    const errMsg = getErrorMessage(error);
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
    } = formik;
    const canLogin = Boolean(values.password?.trim()) && isValid && !isSubmitting && !isLoading;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h1 className="text-center font-inter-semibold text-lg text-[var(--primary-color-a)] mb-2">
                Enter Password to Login
            </h1>

            <div className="text-center mb-6">
                <div className="font-inter-regular text-sm text-[var(--primary-color-a)]">
                    {identifierMeta?.primary || ""}
                    <button
                        type="button"
                        onClick={onChangeIdentifier}
                        className="ml-2 text-[var(--color-pink)] font-inter-regular"
                        style={{ textDecoration: "underline" }}
                    >
                        Change Email
                    </button>
                </div>
                {identifierMeta?.secondary ? (
                    <div className="font-inter-regular text-sm text-[var(--primary-color-a)] opacity-80">
                        {identifierMeta.secondary}
                    </div>
                ) : null}
            </div>

            <div className="w-full mb-4" style={{ position: "relative" }}>
                <RedditInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
                    style={{ color: "rgb(136,99,251)" }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    <EyeIcon off={showPassword} />
                </button>
            </div>

            <button
                type="submit"
                disabled={!canLogin}
                className={`w-full h-[48px] mb-3 text-sm tracking-wide transition-all rounded-md font-inter-semibold
          ${canLogin
                        ? "bg-gradient-to-r from-[rgb(222,87,229)] to-[rgb(136,99,251)] text-white"
                        : "bg-[rgb(236,236,236)] text-[rgb(172,172,172)]"
                    }`}
            >
                {isSubmitting || isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>

            {errMsg ? (
                <div className="w-full text-center text-sm mb-2" style={{ color: "#B00020" }}>
                    {errMsg}
                </div>
            ) : null}

            <button
                type="button"
                className="text-center font-inter-regular text-sm mb-4"
                style={{ color: "var(--color-pink)" }}
            >
                Forgot password?
            </button>

            <button
                type="button"
                className="w-full h-[48px] mb-[28px] text-sm tracking-wide transition-all rounded-md font-inter-semibold"
                style={{
                    background: "transparent",
                    border: "1.5px solid rgb(136,99,251)",
                    color: "var(--primary-color-a)",
                }}
            >
                GET OTP IN YOUR EMAIL
            </button>
        </form>
    );
};
