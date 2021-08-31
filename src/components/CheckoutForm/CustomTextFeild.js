import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const CustomTextFeild = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}

      />
    </Grid>
  );
}

export default CustomTextFeild;
