class Input {
    constructor(placeHolder) {
        this.placeHolder = placeHolder || "Type...";
        this._value = "";
    }

    get value() {
        return this._value;
    }

    setValue(newValue) {
        this._value = newValue;
    }
}

class NumberInput extends Input {
    constructor(placeHolder){
        super(placeHolder);
        this.type = "number";
    }
}

const addRequiredValidation = instance => {
    let requiredValidation = !instance.value ? false : true;
    
    if(requiredValidation){
        console.log("Passed required validation.");
    } else {
        console.log("Not value!");
    }
    
    return requiredValidation;
}

const addMaxLengthValidation  = (instance, length) => {
    let maxLengthValidation = false;
    
    if(typeof instance.value === "number"){
        maxLengthValidation = instance.value <= length ? true : false; 
    } else {
        maxLengthValidation = instance.value.length <= length ? true : false; 
    }

    if(maxLengthValidation){
        console.log("Passed max length validation.");
    } else {
        console.log("Instance length is bigger than input length!");
    }
    return maxLengthValidation;
}

const addNumberValidation = instance => {
    let numberValidation = typeof instance.value === "number" ? true : false; 

    if(numberValidation){
        console.log("Passed number validation.");
    } else {
        console.log("Not a number!");
    }

    return numberValidation;
}

const common = (instance, length = 10) => {
    let requiredValidation = addRequiredValidation(instance);
    let maxLengthValidation = addMaxLengthValidation(instance, length);
    let numberValidation = addNumberValidation(instance);

    if(requiredValidation && maxLengthValidation && numberValidation){
        instance.valid = true;
    } else {
        instance.valid = false;
    }
}

let numberInput = new NumberInput("");

common(numberInput);
console.log(numberInput.valid); 
console.log(`----------------------------\n`);

numberInput.setValue("1");
common(numberInput);
console.log(numberInput.valid); 
console.log(`----------------------------\n`);

numberInput.setValue(1);
common(numberInput);
console.log(numberInput.valid);
console.log(`----------------------------\n`);

numberInput.setValue(1111111111111111111111111111);
common(numberInput);
console.log(numberInput.valid); 