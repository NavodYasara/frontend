function validation (values){
    let errors = {};
    if(!values.email){
        errors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid";
    }
    if(!values.password){
        errors.password = "Password is required";
    }else if(!/\(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(values.password)){
        errors.password = "Password must be more than 6 characters";
    }
    return errors;
}