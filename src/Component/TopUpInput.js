import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    }, 
    cancel: {
        display: 'flex',
        flexGrow: '0 1',
        flexDirection: 'row-reverse',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#999',
    },
    sec_root: {
        padding: '1rem 2%'
    },
    border: {
        border: '2px solid #ddd',
        borderRadius: '4px',
        padding: '1rem 2% 0.6rem',
        marginBottom: '0.5rem',
    },
    err: {
        border: '2px solid tomato',
        borderRadius: '4px',
        padding: '1rem 2% 0.6rem',
        marginBottom: '0.5rem',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    network: {
        borderBottom: '2px solid #3f51b5',
        padding: '0 1rem',
        fontSize: '0.8rem !important',
        marginRight: '4rem',
    },
    errNet: {
        borderBottom: '2px solid tomato',
        padding: '0 1rem',
        fontSize: '0.8rem !important',
        marginRight: '4rem',
        color: 'tomato',
        fontStyle: 'italic',
    }
}))

const TopUpInput = (props) => {
    const ab = useStyles()
    const {id, input} = props
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const network = ['AIRTEL', 'ETISALAT', 'GLO', 'MTN' ]
    let classes = input.err ? ab.err : input.num || input.amt || input.net ? ab.border : ab.sec_root ;
    const handleOpen = () => {
        setOpen(true);
    };
    let errNet = input.err ? ab.errNet : input.net ? ab.network : ''
    return (
        <Typography variant='body2' component='div' className={classes}>
            <Typography variant='body2' component='div' className={ab.cancel}>
                <Avatar className={ab.small} onClick={() => props.onRemove(id)}>&times;</Avatar>
                {input.err || input.net ? <span className={errNet}>{input.err || input.net}</span> : ''}
            </Typography>
            <Grid container> 
                <Grid item container xs={6} className={ab.grid}>
                    <TextField 
                        onChange={(e) => props.onChange(e, id)}
                        id={`${id}mob`} 
                        label="Mobile" 
                        name='num' 
                        type='text'
                        value={input.num}
                        variant="standard" 
                        required 
                        fullWidth 
                    />
                </Grid>           
                <Grid item container xs={4} className={ab.grid}>
                    <TextField 
                        onChange={(e) => props.onChange(e, id)}
                        id={`${id}amt`} 
                        label="Amount" 
                        name='amt' 
                        type='text'
                        value={input.amt}
                        variant="standard" 
                        required 
                        fullWidth 
                    />
                </Grid>
                <Grid item container xs={2}>
                    <FormControl className={ab.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Network</InputLabel>
                        <Select
                            required
                            labelId="demo-controlled-open-select-label"
                            id={`${id}net`}
                            open={open}
                            name='net'
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={input.net}
                            onChange={(e) => props.onChange(e, id)}
                            >
                            <MenuItem value="">
                                <em>Choose Network</em>
                            </MenuItem>
                            {network.map((net, i) => {
                                return <MenuItem value={net} key={i}>{net}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Typography>
    );
};

export default TopUpInput;