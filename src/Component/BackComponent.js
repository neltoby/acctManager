import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles(theme => ({
    down: {
        position: 'fixed',
        display: 'none',
        right: '1rem',
        bottom: '2rem',
        margin: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            display: 'block',
        }
    },
}))

const BackComponent = () => {
    const ab = useStyles()
    const goBack = () => {
       window.history.back()
    }
    return(
        <Fab size='small' 
            color="primary" 
            aria-label="add" 
            className={ab.down}
            onClick={goBack}
        >
            <LeftIcon />
        </Fab>
    )
}
export default BackComponent