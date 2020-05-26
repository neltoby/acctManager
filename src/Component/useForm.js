import {useState} from 'react';

const UseForm = (callback) => {
    const [inputs, setInput] = useState({});
    const handleInputChange = (e) => {
        e.persist();
        let val = e.target.type === 'file' ? {files: e.target.files[0]} : {};
        setInput(inputs => ({
                ...inputs,
                [e.target.name]: e.target.value,
                ...val,

        }))
    }
    const handleFileCancel = (name) => {
        let newInputs = {};
        for(const property in inputs) {
            if(property === name || property === 'files'){
                continue ;
            }else {
                newInputs[property] = inputs[property]
            }
        }
        setInput(newInputs);
    }
    const handleSubmit = (e) => {
        if(e){
            e.preventDefault();
            callback();
        }
    }
    return {inputs, handleInputChange, handleSubmit, handleFileCancel};
};

export default UseForm;