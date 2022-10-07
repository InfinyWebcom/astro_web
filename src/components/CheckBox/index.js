import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

const CheckBox = ({ label, checked, handleChange, disabled = false }) => {
    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox disabled={disabled} checked={checked} onChange={handleChange} name="checkbox" />}
                label={label}
            />

        </FormGroup>
    )
}
export default CheckBox