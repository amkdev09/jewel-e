import React from 'react'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const RedditTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiFilledInput-root': {
        height: 44,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'rgb(246, 243, 249)',
        transition: theme.transitions.create(['background-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: 'rgb(246, 243, 249)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgb(246, 243, 249)',
            boxShadow: `0 0 0 1px var(--primary-color-b)`,
            color: 'var(--primary-color-a)',
        },
        '& input': {
            paddingTop: 18,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 'var(--text-sm)',
            '&::placeholder': {
                color: 'var(--primary-color-a)',
            },
        },
        '& textarea': {
            paddingTop: 16,
            paddingBottom: 14,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 'var(--text-sm)',
            '&::placeholder': {
                color: 'var(--primary-color-d)',
                opacity: 1,
            },
        },
        '&:before, &:after': {
            borderBottom: 'none',
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: 'var(--text-sm)',
        transform: 'translate(16px, 12px) scale(1)',
        '&.MuiInputLabel-shrink': {
            transform: 'translate(16px, 5px) scale(0.74)',
        },
    },
}));

const RedditInput = ({
    label,
    id,
    name,
    type = 'text',
    value,
    defaultValue,
    onChange,
    error,
    helperText,
    fullWidth = true,
    placeholder,
    ...rest
}) => {
    return (
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
            helperText={helperText}
            fullWidth={fullWidth}
            variant="filled"
            InputProps={{ disableUnderline: true }}
            slotProps={{ input: { disableUnderline: true } }}
            {...rest}
        />
    )
}

export default RedditInput