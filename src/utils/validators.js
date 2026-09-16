import validator from "validator";


const validate=(data)=>{
const mandatoryField=["firstName","email","passward"];
const isAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k))
if(!isAllowed){
  throw new Error("some field missing");
}
if(!validator.isEmail(data.email)){
    throw new Error("invalid email");
}
if(!validator.isStrongPassword(data.passward)){
    throw new Error("weak passward");
}
}

export default validate;
