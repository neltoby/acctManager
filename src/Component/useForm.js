import React,{useState} from 'react';

const UseForm = (callback) => {
    const [inputs, setInput] = useState({});
    const handleInputChange = (e) => {
        e.persist();
        let val = e.target.type == 'file' ? {files: e.target.files[0]} : {};
        console.log(val);
        setInput(inputs => ({
                ...inputs,
                [e.target.name]: e.target.value,
                ...val,

        }))
        console.log(inputs);
    }
    const handleFileCancel = (name) => {
        let newInputs = {};
        console.log(name);
        for(const property in inputs) {
            console.log(property);
            if(property == name || property == 'files'){
                continue ;
            }else {
                newInputs[property] = inputs[property]
            }
        }
        console.log(newInputs);
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