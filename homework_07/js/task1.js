var number = parseFloat(prompt("Enter natural number [0 < N <= 20]:"));

if(isNaN(number) || number <= 0 || number > 20 || number % 1 != 0){
    console.log("Incorrect")
} else{
    let left = number;
    let right = number;
    
    let str = "";
    
    for(let i = 1; i <= number; i++){
        for(let j = 1; j <= (number * 2) - 1; j++){
            if(j < left || j > right){
                str = str.concat("   ");
            } else{
                str = str.concat("[~]");
            }
        }
        
        left--;
        right++;
        str = str.concat("\n");
    }
    console.log(str);
}
