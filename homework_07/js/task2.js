var switcher = true;
var maxValue = 5;

var userPrize = 0;

var firstPrize = 10;
var secondPrize = 5;
var thirdPrize = 2;

if(!confirm("Do you want to play a game?")){
    console.log("You did not become a millionaire");
    switcher = false;
}

while(switcher){
    var computerNumber = Math.floor(Math.random() * (maxValue - 0 + 1)) + 0;

    console.log(computerNumber); //cheating :)

    for(var i = 3; i >= 1; i--){
        var flag = false;
        
        var possiblePrize = firstPrize;
        if(i == 2){
            possiblePrize = secondPrize;
        } else if(i == 1){
            possiblePrize = thirdPrize;
        }
        
        var userNumber = Number(prompt("Enter a number from 0 to " + maxValue +
                                      "\nAttempts left: " + i +
                                      "\nTotal prize: " + userPrize + "$" + 
                                      "\nPossible prize on current attempt: " + possiblePrize + "$"));
           
       if(userNumber == computerNumber){
           if(i == 3){
               userPrize = firstPrize;
           } else if(i == 2){
               userPrize = secondPrize;
           } else{
               userPrize = thirdPrize;
           }
           
           flag = true;
           break;   
        }
    }
    
    if(flag){
        if(confirm("Do you want to continue?")){
            firstPrize *= 3;
            secondPrize = Math.floor(firstPrize / 2);
            thirdPrize = Math.floor(secondPrize / 2);
            maxValue *= 2;
        } else{
            console.log("Thank you for a game. Your prize is: " + userPrize + "$");
            prize = 0;
            switcher = confirm("Do you want to play again?"); 
        }
    } else{
        console.log("Thank you for a game. Your prize is: " + userPrize + "$"); 
        switcher = confirm("Do you want to play again?");  
    }   
}