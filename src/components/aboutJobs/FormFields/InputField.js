import theme from '@/theme/theme'
import { Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material';
function InputField(props) {
    const {label, onChange, onBlur, value, error} = props;
    const theme =  useTheme();
  return (
    <div>
       <Stack direction='column'>
       <Typography variant='body2'>{label}</Typography>
        <TextField 
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={Boolean(error)}
        helperText={
            error && <Typography sx={theme.errorMessage}>{error}</Typography>
        }
        size='small'
        />
       </Stack>
    </div>
  )
}

export default InputField