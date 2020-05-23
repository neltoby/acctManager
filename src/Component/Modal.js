import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    outline: 'none',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const opens = props.open

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={opens}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade style={{border: 'none', outline: 'none'}} in={opens}>
          <div className={classes.paper}>
                {props.children}
          </div>
        </Fade>
      </Modal>
  );
}