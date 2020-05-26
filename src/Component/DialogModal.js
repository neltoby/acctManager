import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {closeDialog} from '../b_action'
import {useDispatch} from 'react-redux'

const DialogModal = (props) => {
    const {open, title} = props
    const dispatch = useDispatch()
    const [scroll, setScroll] = React.useState('paper');
    const descriptionElementRef = React.useRef(null);
    const handleClose = () => {
        if(props.close) {
            props.close()
        }else{
            dispatch(closeDialog())
        }
    };
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                
                    {props.children}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {props.type ?
                    <Button onClick={handleClose} color="primary">
                        {props.type === 'statement' ? 'Continue' : 'Subscribe'}
                    </Button> : ''
                }
            </DialogActions>
        </Dialog>
    );
};

export default DialogModal;