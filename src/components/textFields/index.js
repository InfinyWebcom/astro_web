import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

const renderField = ({ input, className, label, width, type, meta: { asyncValidate, touched, error, warning } }) => {
    let val = (touched && error) || (warning ? true : false)
    let err = '';
    if (typeof error == 'object') {
        console.log('value... inside')
        console.log('value........', error.exception)
        err = error.exception
    } else {
        console.log('value..... else')
        err = error
    }

    console.log("touched value........", input)
    return <div className={`${asyncValidate ? 'async-validating' : ''}${className}`}>
        <TextField
            label={label}
            name={input.name}
            id={input.name}
            type={type}
            margin="normal"
            helperText={(touched && err)}
            {...input}
            fullWidth={true}
            error={val ? true : false}
            minDate={new Date()}
            style={{ width: width ? width : '100%', marginTop: width ? 3 : 'auto' }}
        />
    </div>

}

export default renderField