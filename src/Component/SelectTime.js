import React, { useState } from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import {setExpiredTime, selectKeyTimeCancel} from '../b_action'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    roots: {
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    }, 
    row: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const SelectTime = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [num, setNum] = useState('')
    const [duration, setDuration] = useState('')
    const handleDuration  = (e) => {
        setDuration(e.target.value)
    }
    const handleNum  = (e) => {
        setNum(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let sent
        if(num && duration){
            if(duration === 'min'){
                sent = num * 60
            }else{
                sent = `${num}${duration}`
            }
            console.log(sent)
            dispatch(setExpiredTime(sent))
        }   
        dispatch(selectKeyTimeCancel())
        props.generate(sent)
    }
    return (
        <Typography className={classes.root}>
            <Typography className={classes.wid}>
                Select TBT key duration
            </Typography>
            <Typography className={classes.row}>
                <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
                    <Typography className={classes.value}>
                        <TextField required value={num} onChange={handleNum} id="standard-basic" label="Number" />
                    </Typography>
                    <Typography className={classes.option}>               
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="time">Duration</InputLabel>
                            <Select
                                required
                                labelId="duration-label"
                                id="dduration-time"
                                value={duration}
                                onChange={handleDuration}
                                label="Duration"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='min'>Minutes</MenuItem>
                            <MenuItem value='h'>Hour</MenuItem>
                            <MenuItem value='d'>Days</MenuItem>
                            </Select>
                        </FormControl>               
                    </Typography>
                    <Typography className={classes.submit}>
                        <Button
                            variant="contained"
                            size="medium"
                            type='submit'
                            color="default"
                            className={classes.margin}
                            disableFocusRipple={false}
                            disableRipple={false}
                        >
                            GENERATE KEY
                            
                        </Button>
                    </Typography>
                </form>
            </Typography>
        </Typography>
    )
}

export default SelectTime