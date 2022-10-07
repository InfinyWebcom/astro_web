import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({ handleClose, close = 'No', open, handleYes, title, description, dataFive }) => {

    console.log('dataFive', dataFive);

    return (
        <div>

            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        {close}
                    </Button>
                    {handleYes && <Button onClick={handleYes} color="primary" autoFocus>
                        Yes
          </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AlertDialog
