import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonComponent = ({ className = '', onClick, name = '', variant = 'contained', color = 'primary', disabled = false }) => (
    <Button onClick={onClick} className={className} variant={variant} color={color} disabled={disabled}>{name}</Button>
)
export default ButtonComponent