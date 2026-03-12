import React, { createContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const SNACKBAR_STYLES = {
  error: {
    bg: "#f8d7da",
    border: "#f5c6cb",
  },
  success: {
    bg: "#d4edda",
    border: "#c3e6cb",
  },
  warning: {
    bg: "#fff3cd",
    border: "#ffeeba",
  },
  info: {
    bg: "#d1ecf1",
    border: "#bee5eb",
  },
};

const CONTENT_COLOR = "#5e2678";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnack({ open: true, message, severity });
  }, []);

  const handleClose = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const severity = snack.severity;
  const style = SNACKBAR_STYLES[severity] || SNACKBAR_STYLES.info;

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={severity}
          onClose={handleClose}
          iconMapping={{
            error: <InfoOutlinedIcon />,
          }}
          elevation={0}
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-regular)",
            color: CONTENT_COLOR,
            backgroundColor: style.bg,
            border: `1px solid ${style.border}`,
            borderRadius: 7,
            padding: "12px 20px",
            alignItems: "center",
            "& .MuiAlert-icon": {
              color: CONTENT_COLOR,
            },
            "& .MuiAlert-message": {
              color: CONTENT_COLOR,
            },
            "& .MuiAlert-action .MuiIconButton-root": {
              color: CONTENT_COLOR,
            },
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
