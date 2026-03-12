import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconButton, Input, Modal, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import authService from "../services/authService";
import useSnackbar from "../hooks/useSnackbar";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN_SEC = 60;

const ACCENT = "#A65EBA";
const TEXT_MAIN = "#4A4A4A";
const TEXT_MUTED = "#666666";
const BORDER_INPUT = "#E0E0E0";

function formatResendTimer(seconds) {
  return `${seconds} SEC`;
}

const OtpVerificationModal = ({
  open,
  email,
  onClose,
  onChangeEmail,
  onVerificationSuccess,
}) => {
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef([]);

  const emailForApi = (email || "").trim().toLowerCase();

  const extractApiMessage = (err, fallback) =>
    err?.response?.data?.message || err?.message || fallback;

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(`^\\d{${OTP_LENGTH}}$`, `OTP must be ${OTP_LENGTH} digits`),
  });

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await authService.verifyOtp({
          type: "email",
          email: emailForApi,
          otp: values.otp,
        });

        if (!response?.success) {
          showSnackbar(response?.message || "OTP verification failed", "error");
          return;
        }

        onVerificationSuccess();
        showSnackbar("Phone verified successfully.", "success");
      } catch (err) {
        showSnackbar(extractApiMessage(err, "Invalid OTP. Please try again."), "error");
        formik.setFieldValue("otp", "");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!open) return;

    formik.resetForm();
    setResendTimer(RESEND_COOLDOWN_SEC);

    const t = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 200);
    return () => clearTimeout(t);
  }, [open, email]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const t = setInterval(() => {
      setResendTimer((s) => s - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [resendTimer]);

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return;

    setResendLoading(true);

    try {
      const response = await authService.resendOtp({
        type: "email",
        email: emailForApi,
      });

      if (!response?.success) {
        showSnackbar(response?.message || "Failed to resend OTP.", "error");
        return;
      }

      showSnackbar("OTP sent successfully.", "success");
      setResendTimer(RESEND_COOLDOWN_SEC);
    } catch (err) {
      showSnackbar(extractApiMessage(err, "Failed to resend OTP."), "error");
    } finally {
      setResendLoading(false);
    }
  };

  const value = formik.values.otp;

  const handleOtpChange = (index, digit) => {
    const arr = value.split("");

    while (arr.length < OTP_LENGTH) arr.push("");

    arr[index] = digit;

    const next = arr.join("").trim();

    formik.setFieldValue("otp", next);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (next.length === OTP_LENGTH) {
      setTimeout(() => formik.handleSubmit(), 150);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const arr = value.split("");

      if (!arr[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      arr[index] = "";
      formik.setFieldValue("otp", arr.join(""));
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!text) return;

    formik.setFieldValue("otp", text);

    const index = Math.min(text.length - 1, OTP_LENGTH - 1);
    inputRefs.current[index]?.focus();

    if (text.length === OTP_LENGTH) {
      setTimeout(() => formik.handleSubmit(), 150);
    }
  };

  if (!email) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0,0,0,0.5)" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 380,
          bgcolor: "#fff",
          borderRadius: 4,
          p: 3,
          outline: "none",
        }}
      >
        {/* Close */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Close />
        </IconButton>

        {/* Email */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {email}
        </p>

        <p
          style={{
            fontSize: 14,
            textAlign: "center",
            color: TEXT_MUTED,
            marginBottom: 20,
          }}
        >
          Enter OTP sent to email{" "}
          <button
            onClick={onChangeEmail}
            style={{
              background: "none",
              border: "none",
              color: ACCENT,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Change Email
          </button>
        </p>

        {/* OTP Inputs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <Input
              key={i}
              inputRef={(el) => (inputRefs.current[i] = el)}
              value={value[i] || ""}
              onFocus={() => setFocusedIndex(i)}
              onChange={(e) =>
                handleOtpChange(i, e.target.value.replace(/\D/g, "").slice(-1))
              }
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              onPaste={handleOtpPaste}
              disableUnderline
              inputProps={{ maxLength: 1 }}
              sx={{
                width: 52,
                height: 52,
                border: "1px solid",
                borderColor: focusedIndex === i ? ACCENT : BORDER_INPUT,
                borderRadius: 2,
                fontSize: 20,
                textAlign: "center",
                "& input": { textAlign: "center" },
              }}
            />
          ))}
        </div>

        {/* Resend */}
        <p style={{ textAlign: "center", color: ACCENT, marginBottom: 20 }}>
          {resendTimer > 0 ? (
            <>RESEND IN {formatResendTimer(resendTimer)}</>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              style={{
                border: "none",
                background: "none",
                color: ACCENT,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </p>

        {/* Verify */}
        <button
          disabled={loading || value.length !== OTP_LENGTH}
          onClick={formik.handleSubmit}
          style={{
            width: "100%",
            height: 48,
            borderRadius: 8,
            border: "none",
            background:
              "linear-gradient(to right, rgb(222, 87, 229), rgb(136, 99, 251))",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Verifying..." : "VERIFY"}
        </button>
      </Box>
    </Modal>
  );
};

export default OtpVerificationModal;