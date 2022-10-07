import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const FlatButtonGroup = ({ switch1 = '', active = false, handleSwitch1, id2 = '', disableA = false, isVertical, LabelA, LabelB, LabelC, id, buttonA, buttonB, buttonC, LabelD = '', buttonD = '', LabelE = '', buttonE }) => {
    const [anchorEl, setAnchor] = useState('')

    const button_a = () => {
        setAnchor('')
        buttonA(id)
    }
    const button_b = () => {
        setAnchor('')
        buttonB(id)
    }
    const button_c = () => {
        setAnchor('')
        buttonC(id)
    }
    const button_d = () => {
        setAnchor('')
        buttonD(id)
    }
    const button_e = () => {
        setAnchor('')
        buttonE(id)
    }
    return (
        <>
            <div className="d-none d-md-block" key={id._id}>
                <div className='d-inline mt-3'>
                    {LabelA && <Button disabled={disableA} variant="contained" className="jr-btn bg-blue text-white text-uppercase mt-2" onClick={() => buttonA(id)}>{LabelA}</Button>}
                    {LabelB && <Button variant="contained" className="jr-btn bg-pink text-white text-uppercase mt-2" onClick={() => buttonB(id)}>{LabelB}</Button>}
                    {LabelC && <Button variant="contained" className="jr-btn bg-success text-white text-uppercase mt-2" onClick={() => buttonC(id)}>{LabelC}</Button>}
                    {LabelD && <Button variant="contained" className="jr-btn bg-teal text-white text-uppercase mt-2" onClick={() => buttonD(id)}>{LabelD}</Button>}
                    {LabelE && <Button variant="contained" className="jr-btn bg-light-blue text-white text-uppercase mt-2" onClick={() => buttonE(id)} >{LabelE}</Button>}
                    {switch1 && <FormControlLabel
                        control={<Switch checked={active} onChange={() => handleSwitch1(id)} name="checkedA" color={active ? "secondary" : 'primary'} />}
                        label={switch1}
                    />}
                </div>
            </div>
            <div className='d-md-none'>
                <span type='button' key={id} onClick={(e) => setAnchor(e.currentTarget)}><i className='zmdi zmdi-more-vert zmdi-hc-2x'></i></span>
            </div>
            <Popover
                id={id}
                open={anchorEl ? true : false}
                anchorEl={anchorEl}
                onClose={() => setAnchor('')}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List component="nav" aria-label="main mailbox folders">
                    {LabelA && <ListItem button>

                        <ListItemText primary={LabelA} onClick={() => button_a(id)} />
                    </ListItem>}
                    {LabelB && <ListItem button>

                        <ListItemText primary={LabelB} onClick={() => button_b(id)} />
                    </ListItem>}
                    {LabelC && <ListItem button>

                        <ListItemText primary={LabelC} onClick={() => button_c(id)} />
                    </ListItem>}
                    {LabelD && <ListItem button>

                        <ListItemText primary={LabelD} onClick={() => button_d(id)} />
                    </ListItem>}
                    {LabelE && <ListItem button>

                        <ListItemText primary={LabelE} onClick={() => button_e(id)} />
                    </ListItem>}
                    {switch1 && <ListItem button>

                        <ListItemText primary={active ? 'Activate' : 'Block'} onClick={() => handleSwitch1(id)} />
                    </ListItem>}
                </List>
            </Popover>
        </>
    );
};

export default FlatButtonGroup;