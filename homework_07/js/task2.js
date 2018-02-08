var switcher = true;
var max_value = 5;

var prize = 0;

var first_prize = 10;
var second_prize = 5;
var third_prize = 2;

if(!confirm("Do you want to play a game?")){
    console.log("You did not become a millionaire");
    switcher = false;
}

while(switcher){
    var computer_number = Math.floor(Math.random() * (max_value - 0 + 1)) + 0;

    console.log(computer_number); //cheating :)

    for(var i = 3; i >= 1; i--){
        var flag = false;
        var possible_prize = first_prize;
        
        if(i == 2){
            possible_prize = second_prize;
        } else if(i == 1){
            possible_prize = third_prize;
        }
        
        var user_number = Number(prompt("Enter a number from 0 to " + max_value +
                                      "\nAttempts left: " + i +
                                      "\nTotal prize: " + prize + "$" + 
                                      "\nPossible prize on current attempt: " + possible_prize + "$"));
           
       if(user_number == computer_number){
           prize += getPrize(i);
           flag = true;
           break;   
        }
    }
    
    if(flag){
        if(confirm("Do you want to continue?")){
            first_prize *= 3;
            second_prize *= 3;
            third_prize *= 3;
            max_value *= 2;
        } else{
            printPrice(prize);
            switcher = !playAgain();
        }
    } else{
        prize += 0;
        printPrice(prize);
        prize = 0;
        switcher = playAgain();
    }   
}

function playAgain(){
     return confirm("Do you want to play again?");
}
     
function getPrize(n){
    if(n == 3) return first_prize;
    else if(n == 2) return second_prize;
    else if (n == 1) return third_prize;
    else return 0;
}

function printPrice(p){
   console.log("Thank you for a game. Your prize is: " + p + "$"); 
}