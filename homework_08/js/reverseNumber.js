function reverseNumber(inputNumber){
    var reverse = "";
    var s = 1;
    if(inputNumber < 0){
        s = -1;
        inputNumber *= s;
    }
    while(inputNumber >= 1){
        reverse += parseInt(inputNumber % 10);
        inputNumber = inputNumber / 10;
    }
    return reverse * s;
}