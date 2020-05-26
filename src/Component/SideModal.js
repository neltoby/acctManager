import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { FaRegTimesCircle } from 'react-icons/fa'
import {IconContext} from "react-icons";

const useStyles = makeStyles(theme => ({
    overlay: {
        position: 'fixed',
        width: '100vw',
        height: '100vh !important',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'block',
        zIndex: 5,     
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    close: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontWeight: 'bold',
        border: 'none',
        backgroundColor: 'transparent',
        zIndex: 7,
    }
}))

export default function SideModal(props) {
    const classes = useStyles();
    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.overlay}>
                <IconContext.Provider value={{ size: '2em', color: '#fff' }}>
                <button type='button' className={classes.close} onClick={props.close}><FaRegTimesCircle/></button>
                {props.children}
                </IconContext.Provider>
            </div>
        </Slide>
    );
}