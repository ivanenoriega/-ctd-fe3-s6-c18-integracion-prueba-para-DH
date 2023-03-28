import { FormControl, FormHelperText, InputLabel, Select as MuiSelect, SelectProps } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { FC } from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";

export type Option = {
    value: string;
    label: string;
}

export type Props = {
    control: Control;
    name: string;
    rules?: any; // TODO: add type
    id: string;
    label: string;
    options: Option[];
    helperText?: string;
} & SelectProps;

const Select: FC<Props> = ({ control, name, rules, id, label, options, helperText, ...props }) => {
    const { field } = useController({
        name,
        control,
        rules,
    });
    return (
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <MuiSelect
                {...props}
                onChange={field.onChange}
                value={field.value}
                label={label}>
                {options.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
            </MuiSelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};


export default Select;