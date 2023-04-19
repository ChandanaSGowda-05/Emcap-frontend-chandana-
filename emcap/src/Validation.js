export default function Validation(values){
    const errors={}

    const name_pattern = /^[A-Za-z]{3,15}$/
    const empid_pattern = /^(\d{8})+$/

    if(values.name === ""){
        errors.name = "Name is required";
    }
    else if(!name_pattern.test(values.name)){
        errors.name = "Name should have Alphabets only. Minimum 3 letters and maximum 15 letters required.";
    }

    if(values.designation === ""){
        errors.designation = "Designation is required";
    }

    if(values.doj === ""){
        errors.doj = "Date of Joining is required";
    }

    if(values.empid === ""){
        errors.empid = "Empid is required";
    }
    else if(!empid_pattern.test(values.empid)){
        errors.empid = "Empid is not valid";
    }

    if(values.skill === ""){
        errors.skill = "Skill is required";
    }

    if(values.training === ""){
        errors.training = "Trainings and poc is required";
    }

    return errors;
}