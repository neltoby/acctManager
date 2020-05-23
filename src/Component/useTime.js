import React from 'react';
import {expiredKey} from '../b_action'
import {useDispatch} from 'react-redux'

const useTime = (time) => {
    const [refinedTime, setRefinedTime] = React.useState('')
    const dispatch = useDispatch()
    React.useEffect(() => {       
        const interval = setInterval(() => {
            if(time){
                let d = new Date()
                let refined = d.getTime() / 1000
                if(refined > parseInt(time)){
                    setRefinedTime('Expired')
                    dispatch(expiredKey('expired'))
                }else{
                    let displayTime;
                    let avail = (time - refined) ;
                    if(avail > 59){
                    let mins = avail / 60
                    if(mins > 59){
                            let hr = mins / 60
                            if(hr > 24){
                                displayTime = `1d`
                            }else{
                                displayTime = `${Math.round(hr)}h`
                            }
                    }else{
                        displayTime = `${Math.round(mins)}m`
                    }
                    }else{
                        displayTime = `${Math.round(avail)}s`
                    }
                    setRefinedTime(displayTime)
                }
            }else{
                setRefinedTime('')
            }
        }, 1000);
        
        return () => clearInterval(interval)
    })
    let selector = refinedTime === 'Expired' ? 'red' : 'green' ;
    return {refinedTime, selector}
};

export default useTime;