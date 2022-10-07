import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';

const renderReactStrapField = ({ append = '', prepend = '', placeholder = '', formGroupClass = '', classNameField = '', name, input, hide, hidden, disabled, label, value, type, props }) => {
    return <FormGroup style={{ display: hide === true ? 'none' : '' }} className={formGroupClass}>
        {label && <Label className='mb-2' for={label}>{label}</Label>}
        {
            (prepend || append) ? <InputGroup>
                {prepend && <InputGroupAddon addonType="prepend">
                    <InputGroupText>{prepend}</InputGroupText>
                </InputGroupAddon>}
                <Input value={value} placeholder={placeholder} className={classNameField} disabled={disabled} hidden={hidden} type={type} {...props} {...input} />
                {append && <InputGroupAddon addonType="append">
                    <InputGroupText>{append}</InputGroupText>
                </InputGroupAddon>}


            </InputGroup> :
                <React.Fragment>
                    <Input value={value} placeholder={placeholder} className={classNameField} disabled={disabled} hidden={hidden} type={type} {...props} {...input} />

                </React.Fragment>
        }

    </FormGroup >
}
export default renderReactStrapField