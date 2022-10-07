import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';

const renderReactStrapField = ({ append = '', prepend = '', placeholder = '', formGroupClass = '', classNameField = '', input, value2, hide, hidden, disabled, label, value, type, props, meta: { asyncValidate, touched, error, warning } }) => {
    console.log('props input=====', value, value2, input)
    if (input.name !== undefined && input.name === "otherName") {
        console.log('props input inside', label)
    }
    return <FormGroup style={{ display: hide === true ? 'none' : '' }} className={asyncValidate ? `async-validating ${formGroupClass}` : formGroupClass}>
        {label && <Label className='mb-2' for={label}>{label}</Label>}
        {
            (prepend || append) ? <InputGroup>
                {prepend && <InputGroupAddon addonType="prepend">
                    <InputGroupText>{prepend}</InputGroupText>
                </InputGroupAddon>}
                <Input value={value} placeholder={placeholder} className={classNameField} disabled={disabled} hidden={hidden} invalid={(touched && error) || (warning)} type={type} {...props} {...input} />
                {append && <InputGroupAddon addonType="append">
                    <InputGroupText>{append}</InputGroupText>
                </InputGroupAddon>}
                <FormFeedback>{error}</FormFeedback>

            </InputGroup> :
                <React.Fragment>
                    <Input value={value ? value : value2} placeholder={placeholder} className={classNameField} disabled={disabled} hidden={hidden} invalid={(touched && error) || (warning)} type={type} {...props} {...input} />
                    <FormFeedback>{error}</FormFeedback>
                </React.Fragment>
        }

    </FormGroup>
}
export default renderReactStrapField