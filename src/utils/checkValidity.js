export const checkValidity = (value, rules) => {

    let isValid = false;

    if(rules.required) {
        isValid = value.trim().length >= 3;
    };

    return isValid;
};