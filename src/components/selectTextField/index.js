import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const RenderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => {
    console.log('inputs==', input)
    return <FormControl error={touched && error} className={`w-100 ${(label != 'User Type' && label != 'State') ? 'mt-3' : ''}`}>
        <InputLabel className='mb-2' htmlFor={input.id}>{label}</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: input.name,
                id: input.id,
            }}

        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
}

export default RenderSelectField;