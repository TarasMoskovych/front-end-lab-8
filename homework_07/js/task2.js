var switcher = true;
var maxValue = 5;
var userPrize = 0;
var maxPrize = 10;
var computerNumber, 
    userNumber, 
    victory, 
    possiblePrize,
    reset;

if(!confirm("Do you want to play a game?")){
    console.log("You did not become a millionaire");
    switcher = false;
}

while(switcher){
    computerNumber = Math.floor(Math.random() * (maxValue - 0 + 1)) + 0;
    reset = false;
  
    for(var i = 3; i >= 1; i--){
        victory = false;
        
        if(i == 3){
           possiblePrize = maxPrize; 
        } else if(i == 2){
            possiblePrize = Math.floor(possiblePrize / 2);
        } else{
            possiblePrize = Math.floor(possiblePrize / 2);
        }
        
        userNumber = prompt("Enter a number from 0 to " + maxValue +
                                         "\nAttempts left: " + i +
                                         "\nTotal prize: " + userPrize + "$" + 
                                         "\nPossible prize on current attempt: " + possiblePrize + "$");

        if(userNumber == computerNumber.toString()){
           userPrize += possiblePrize;
           victory = true;
           break;   
        }
    }
    
    if(victory){
        if(confirm("Do you want to continue?")){
            maxPrize *= 3;
            maxValue *= 2;
        } else{
            reset = true;
        }
    } else{
        userPrize = 0;
        reset = true;
    }  
    
    if(reset){
        console.log("Thank you for a game. Your prize is: " + userPrize + "$");
        if(confirm("Do you want to play again?")){
            userPrize = 0;
            maxPrize = 10;
            maxValue = 5; 
        } else{
            switcher = false;
        }
    }
}