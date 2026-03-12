import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

const INPUT_BG = "rgb(246, 243, 249)";
const TEXT_MAIN = "var(--primary-color-a)";

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5z" />
    </svg>
);

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

const RedditPhoneInput = ({
    defaultCountryCode,
    label,
    id,
    name,
    type = "tel",
    value,
    defaultValue,
    onChange,
    error,
    helperText,
    fullWidth = true,
    placeholder,
    onCountryChange,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState({
        code: "IN",
        name: "India",
        dialCode: "+91",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get(
                    "https://restcountries.com/v3.1/all?fields=name,idd,cca2"
                );

                const formatted = res.data
                    .map((c) => ({
                        code: c.cca2,
                        name: c.name.common,
                        dialCode: c.idd.root
                            ? `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ""}`
                            : "",
                    }))
                    .filter((c) => c.dialCode !== "")
                    .sort((a, b) => a.name.localeCompare(b.name));

                setCountries(formatted);

                if (defaultCountryCode) {
                    const match =
                        formatted.find((c) => c.dialCode === defaultCountryCode) ||
                        formatted.find((c) => c.dialCode.replace("+", "") === defaultCountryCode);
                    if (match) {
                        setSelectedCountry(match);
                    }
                }
            } catch {
                // keep default IN +91 on error
            }
        };

        fetchCountries();
    }, [defaultCountryCode]);

    const filtered = countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        onCountryChange({ target: { name: "countryCode", value: country.dialCode } });
        handleClose();
    };

    return (
        <div className="w-full">
            <div
                className="flex items-center rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[var(--primary-color-b)]"
                style={{ backgroundColor: INPUT_BG, height: "44px", borderRadius: "8px" }}
            >
                <button
                    type="button"
                    className="flex items-center gap-1.5 pl-4 pr-2 flex-shrink-0 border-r border-[var(--primary-color-b)] bg-transparent outline-none"
                    style={{ backgroundColor: INPUT_BG }}
                    onClick={handleOpen}
                >
                    <span style={{ fontSize: "14px", color: TEXT_MAIN }}>
                        {selectedCountry.code} {selectedCountry.dialCode}
                    </span>
                    <span style={{ color: TEXT_MAIN }}>
                        <ChevronDownIcon />
                    </span>
                </button>
                <RedditTextField
                    id={id}
                    name={name}
                    type={type}
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
            </div>
            <Modal open={open} onClose={handleClose}>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl">
                        {/* Header */}
                        <div className="flex justify-end items-center px-5 pt-4">
                            <button
                                onClick={handleClose}
                                className="text-xl text-[var(--primary-color-a)]"
                                type="button"
                            >
                                <RxCross2 size={28} />
                            </button>
                        </div>
                        <h2 className="text-xl font-semibold text-[var(--primary-color-a)] px-5 py-4">
                            Search Country code
                        </h2>

                        {/* Search */}
                        <div className="px-5 pb-4">
                            <input
                                type="text"
                                placeholder="Type Country name or code"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none text-sm"
                            />
                        </div>

                        {/* Country List */}
                        <ul className="h-[420px] overflow-y-auto mobile-modal-scrollbar">
                            {filtered.map((country) => (
                                <li
                                    key={country.code + country.dialCode}
                                    onClick={() => handleCountrySelect(country)}
                                    className="px-5 py-4 border-t border-[var(--primary-color-d)] cursor-pointer hover:bg-[var(--primary-color-d)]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-regular text-[var(--primary-color-a)]">
                                                {country.code}
                                            </span>
                                            <span className="text-sm font-semibold text-[var(--primary-color-a)]">{country.name}</span>
                                        </div>

                                        <span className="text-sm font-semibold text-[var(--primary-color-a)]">
                                            {country.dialCode}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Modal>
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

export default RedditPhoneInput;