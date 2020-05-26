import React from 'react';
import AllowedMain from './AllowedMain'
import AllowedSide from './AllowedSide'
import {makeStyles} from "@material-ui/core/styles";
import SideModal from './SideModal'
import useGenkey from './useGenkey'
import {useSelector, useDispatch} from 'react-redux'
import {removeSideBar} from '../action'

const useStyles = makeStyles(theme => ({
    broot: {
        flexGrow: 1,
        backgroundColor: 'rgba(128,128,128,0.1)',
    },
    roots: {
        flexGrow: 1,
        backgroundColor: '#332e2d',
    },
    lroot: {
        width: '100%',
        backgroundColor: 'inherit',
        color: 'white',
    },
    lroots: {
        marginBottom: '1.5rem',
    },
    litem: {
        color: 'white',
    },
    inline: {
        display: 'inline',
        color: 'white',
    },
    contain: {
        marginBottom: '2rem',
        backgroundColor: '#7f7f7f',
    }
}))

const Allowed = (props) => {
    const {bank, acct, country} = props
    const ab = useStyles();
    const store = useSelector(state => state);
    const dispatch = useDispatch()
    const {confirmKey} = useGenkey(acct)
    React.useEffect(() => {
        confirmKey()
    }, [country, bank, acct])
    return (
        <>
            <AllowedSide bank={bank} acct={acct}/>
            <AllowedMain country={country} bank={bank} acct={acct}  />
            <div>
                {store.home.side ? <SideModal close={() => dispatch(removeSideBar())}><AllowedSide bank={bank} acct={acct} overlay={true} /></SideModal> : ''}
            </div>
        </>
    );
};

export default Allowed;