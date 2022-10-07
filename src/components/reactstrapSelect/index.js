import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const renderSelectField = ({ input, props, label, classNameField, defaultValue, meta: { touched, error, warning }, children, ...custom }) => {
    return <FormGroup>
        <Label for={label}>{label}</Label>
        <Input className={classNameField}
            {...props} type="select" invalid={(touched && error) || (warning)}  {...custom} {...input}>
            {children}
        </Input>
        <FormFeedback>{error}</FormFeedback>
    </FormGroup>
}

export default renderSelectField