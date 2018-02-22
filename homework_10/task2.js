/**
 * @typedef {Object} CombatHistory
 * @property {wins} number - Number of victories
 * @property {loses} number - Number of defeats
 */

/**
 * @typedef {Object} Stats
 * @property {string} name - The name of fighter
 * @property {number} attack - The amount of attack of fighter
 * @property {number} hp - The total number of health point of fighter
 */

/**
 * @typedef {Object} Fighter
 * @property {function} getName - Return name of the fighter
 * @property {function} fight - Return true if fighter make dmg to enemy, otherwise false
 * @property {function} block - Return true if enemy can block incoming damage, otherwise false (randomly)
 * @property {function} getStats - Retrurn {Stats} of fighter
 * @property {number} getCombatHistory - Return {CombatHistory} of previous fights
 */

/**
 * Pretty print fighter's info
 * @param {Fighter} fighter - The fighter
 * DO NOT MODIFY
 */
function showResult(fighter) {
  console.log('Fighter', fighter.getName());
  console.log('- Combat stats:', fighter.getCombatHistory());
  console.log('- Properties:', fighter.getStats());
}


function fighter(attacker) {    
    var combatHistory = {
        wins: 0,
        loses: 0
    }
    
    var stats = {
        name: attacker.name,
        attack: attacker.attack,
        hp: attacker.hp
    }
    
    return{
        getName: function() {
            return attacker.name;
        },
        
        fight: function(defender) {
            //player who has 0 HP cannot fight
            if(stats.hp === 0 || defender.getStats().hp === 0){
                return false;
            }
            //defender did not block damage of attacker
            if(!defender.block()){
                //if defender's hp = 0, defender lost and attacker won
                if(defender.getStats().hp - stats.attack <= 0){
                    defender.getCombatHistory().loses++;
                    combatHistory.wins++;
                    defender.getStats().hp = 0; //defender's hp cannot be less than 0
                } else{
                    defender.getStats().hp -= stats.attack;
                }
                return true;
            } 
            //defender blocked damage of attacker
            return false;
        },
        
        block: function() {
            return Math.random() > 0.5;
        },
        
        getStats: function() {
            return stats;
        },
        
        getCombatHistory: function() {
            return combatHistory;
        }   
    }
}

var fighter1 = fighter({name: 'John', attack: 100, hp: 100});
var fighter2 = fighter({name: 'Kayn', attack: 50, hp: 300});
var fighter3 = fighter({name: 'Bill', attack: 40, hp: 100});

fighter1.fight(fighter2); 
fighter1.fight(fighter3); 

showResult(fighter1);
showResult(fighter2); 
showResult(fighter3);