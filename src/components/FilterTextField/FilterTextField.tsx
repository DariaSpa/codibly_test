import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface FilterTextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const FilterTextField: React.FC<FilterTextFieldProps> = ({ label, value, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/\D/g, '');
        onChange(filteredValue);
    };

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            type='text'
            variant='filled'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                    border: '1px solid #ccc',
                    '&:hover, &:focus': {
                        borderColor: 'black',
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray',
                },
            }
            }
        />
    );
};

export default FilterTextField;
