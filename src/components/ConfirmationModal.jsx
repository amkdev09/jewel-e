import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { AppColors } from "../constant/appColors";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  okText = "OK",
  cancelText = "Cancel",
  confirmColor = "primary",
  loading = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (!loading) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      sx={{
        "& .MuiDialog-paper": {
          background: "#ffffff",
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          border: "1px solid #f3e8ff",
          boxShadow: "0 18px 45px rgba(148, 59, 207, 0.25)",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
        }}
      >
        <span className="text-lg font-bold text-[#231535]">{title}</span>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <p className="text-base text-[#4b5563]">{description}</p>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          gap: 1,
        }}
      >
        <button
          onClick={handleCancel}
          disabled={loading}
          className="px-3 py-1 rounded-md text-lg font-inter-regular"
          style={{
            background:
              confirmColor !== "primary"
                ? "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)"
                : "none",
            color: confirmColor !== "primary" ? "#ffffff" : "#231535",
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="px-3 py-1 rounded-md text-lg font-inter-regular"
          style={{
            background:
              confirmColor === "primary"
                ? "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)"
                : "none",
            color: confirmColor === "primary" ? "#ffffff" : "#231535",
          }}
        >
          {okText}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
