var switcher = true;
var maxValue = 5;
var userPrize = 0;
var firstPrize = 10;
var secondPrize = 5;
var thirdPrize = 2;
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
           possiblePrize = firstPrize; 
        } else if(i == 2){
            possiblePrize = secondPrize;
        } else{
            possiblePrize = thirdPrize;
        }
        
        userNumber = prompt("Enter a number from 0 to " + maxValue +
                                         "\nAttempts left: " + i +
                                         "\nTotal prize: " + userPrize + "$" + 
                                         "\nPossible prize on current attempt: " + possiblePrize + "$");

        if(userNumber == computerNumber.toString()){
           if(i == 3){
               userPrize = firstPrize;
           } else if(i == 2){
               userPrize = secondPrize;
           } else{
               userPrize = thirdPrize;
           }
           victory = true;
           break;   
        }
    }
    
    if(victory){
        if(confirm("Do you want to continue?")){
            firstPrize *= 3;
            secondPrize = Math.floor(firstPrize / 2);
            thirdPrize = Math.floor(secondPrize / 2);
            maxValue *= 2;
        } else{
            reset = true;
        }
    } else{
        reset = true;
    }  
    if(reset){
        console.log("Thank you for a game. Your prize is: " + userPrize + "$");
        if(confirm("Do you want to play again?")){
            userPrize = 0;
            firstPrize = 10;
            secondPrize = 5;
            thirdPrize = 2;
            maxValue = 5; 
        } else{
            switcher = false;
        }
    }
}