import React,{useEffect} from 'react';
import { useSelector } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import img from '../Images/anonymousUser.png'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import isJson from '../isJson'

const useStyles = makeStyles(theme => ({
    // root: {
    //     '& > *': {
    //         margin: theme.spacing(1),
    //     },
    // },
    margin: {
        marginTop: '0.4rem',
        marginBottom: '0rem',
        justifyContent: 'center',
    },
    bottom: {
        marginBottom: '1rem',
    },
    input: {
        display: 'none',
    },
    divInfo: {
        padding: '0.2rem',
        border: '1px solid #fff',
        color: '#fff',
    },
    color: {
        color: '#fff',
    }
}));

const UploadProfile = (props) => {
    const classes = useStyles();
    let store = isJson(useSelector(state => state))
    useEffect(() => {
        return () => {
            props.handleFileCancel('profile')
        }
    },[])
    let display = props.inputs.files ? URL.createObjectURL(props.inputs.files) : img ;
    let cancelButton = props.inputs.profile ? <Grid container spacing={1} className={classes.divInfo}>
        <Grid item xs={10}>
            {props.inputs.files.name}
        </Grid>
        <Grid item xs={2}>
            <IconButton aria-label="delete" className={classes.color} onClick={() => props.handleFileCancel('profile')}>
                <DeleteIcon />
            </IconButton>
        </Grid>
    </Grid> : '' ;
    return (
        <>
            <Grid container spacing={1} className={classes.margin}>
                <Grid item xs={false} sm={2}>

                </Grid>
                <Grid item xs={12} sm={8}>
                    <img src={display} width='150' height='150' alt='User profile' />
                    <br/>
                    {cancelButton}
                    <br/><br/>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        name='profile'
                        value={props.inputs.profile}
                        onChange={props.handleInputChange}
                    />
                    <Typography  component='div'>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                    </Typography>
                    <Typography variant="caption" className={classes.color}>
                        {props.validator.current.message('profile', props.inputs.profile, 'required')}
                    </Typography>
                    <Typography variant="caption" className={classes.color}>
                        {props.error ? `Submission Failed! Incomplete form.` : store.create.error ? store.create.error : ''}
                    </Typography>
                </Grid>
                <Grid item xs={false} sm={2}>

                </Grid>
            </Grid>
        </>
    );
};

export default UploadProfile;