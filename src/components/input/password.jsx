import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const INPUT_BG = "rgb(246, 243, 249)";
const TEXT_MAIN = "var(--primary-color-a)";

const RedditTextField = styled(TextField)(({ hasError }) => ({
    width: "100%",
    "& .MuiFilledInput-root": {
        height: 44,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: INPUT_BG,
        transition: "none",
        "&:hover": {
            backgroundColor: INPUT_BG,
        },
        "&.Mui-focused": {
            backgroundColor: INPUT_BG,
            boxShadow: "none",
            color: TEXT_MAIN,
        },
        "& input": {
            paddingTop: 18,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: "var(--text-sm)",
            "&::placeholder": {
                color: TEXT_MAIN,
            },
        },
        "& textarea": {
            paddingTop: 16,
            paddingBottom: 14,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: "var(--text-sm)",
            "&::placeholder": {
                color: TEXT_MAIN,
                opacity: 1,
            },
        },
        "&:before, &:after": {
            borderBottom: "none",
        },
    },
    "& .MuiInputLabel-root": {
        fontSize: "var(--text-sm)",
        transform: "translate(16px, 12px) scale(1)",
        "&.MuiInputLabel-shrink": {
            transform: "translate(16px, 5px) scale(0.74)",
        },
    },
}));

const RedditPasswordInput = ({
    label,
    id,
    name,
    value,
    defaultValue,
    onChange,
    error,
    helperText,
    fullWidth = true,
    placeholder,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div
                className="flex items-center rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[var(--primary-color-b)]"
                style={{ backgroundColor: INPUT_BG, height: "44px", borderRadius: "8px" }}
            >
                <RedditTextField
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    label={label}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    error={error}
                    fullWidth={fullWidth}
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    slotProps={{ input: { disableUnderline: true } }}
                    {...rest}
                />
                <button
                    type="button"
                    className="flex items-center pr-2 flex-shrink-0 bg-transparent outline-none cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <AiOutlineEyeInvisible size={22} color={TEXT_MAIN} /> : <AiOutlineEye size={22} color={TEXT_MAIN} />}
                </button>
            </div>
            {error && helperText && (
                <p
                    className="text-sm mt-1 text-[var(--error-color)] ml-2"
                >
                    {helperText}
                </p>
            )
            }
        </div>
    );
};

export default RedditPasswordInput;