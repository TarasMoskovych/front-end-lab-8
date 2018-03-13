var naturalNumber = Number(prompt("Enter natural number from 1 to 20:"));

if(isNaN(naturalNumber) || !Number.isInteger(naturalNumber) || naturalNumber <= 0 || naturalNumber > 20){
    console.error("Incorrect")
} else{
    var left = naturalNumber;
    var right = naturalNumber;
    
    var pyramid = "";
    
    for(var i = 1; i <= naturalNumber; i++){
        for(var j = 1; j <= (naturalNumber * 2) - 1; j++){
            if(j < left || j > right){
                pyramid += "   ";
            } else{
                pyramid += "[~]";
            }
        }
        
        left--;
        right++;
        pyramid += "\n";
    }
    console.log(pyramid);
}