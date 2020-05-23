import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import { Route, Switch } from 'react-router-dom'
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}))

const SignUpIn = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item sm={7} xs={false}>
                </Grid>
                <Switch>
                    <Route exact path='/'><SignIn /></Route>
                    <Route path='/login'><SignIn /></Route>
                    <Route path='/create'><SignUp /></Route>
                </Switch>
            </Grid>
        </div>
    );
};

export default SignUpIn;