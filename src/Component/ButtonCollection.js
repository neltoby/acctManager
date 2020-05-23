import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
    root: {
        color: '#fff',
        // color: '#00695c',
    },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: '#fff',
    },

}));

export const ButtonFinish = (props) => {
    const classes = useStyles();
    let fullWidth = props.width ? true : false ;
    return (                
        <Button
            fullWidth={fullWidth}
            disabled={props.loading}
            type='submit'
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
            disableFocusRipple={false}
            disableRipple={false}>
            {props.loading ? <ColorCircularProgress size={20} thickness={5} /> : props.text }
            
        </Button>
                   
    );
};

export const ButtonNext = (props) =>
{
    const classes = useStyles();
    return(
        <Button
            variant="contained"
            color="primary"
            onClick={props.onClick}
            className={classes.button}
        >
            Next
        </Button>
    )
}