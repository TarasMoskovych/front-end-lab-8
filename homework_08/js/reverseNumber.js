function reverseNumber(inputNumber){
    var reverse = "";
    
    if(inputNumber < 0){
        reverse += "-";
        inputNumber = Math.abs(inputNumber);
    }
    
    while(inputNumber >= 1){
        reverse += parseInt(inputNumber % 10);
        inputNumber = inputNumber / 10;
    }
    
    return parseInt(reverse);
}