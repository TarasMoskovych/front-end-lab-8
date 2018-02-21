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
    
    function getName() {
        return attacker.name;
    }
    
    function fight(defender) {
        //player who has 0 hp cannot fight
        if(stats.hp === 0 || defender.getStats().hp === 0 || attacker === defender){
            return false;
        }
        //defender does not block damage of attacker
        if(!block()){
            //if defender's hp = 0, defender lost and fighter won
            if(defender.getStats().hp - stats.attack <= 0){
                defender.getCombatHistory().loses++;
                combatHistory.wins++;
                defender.getStats().hp = 0; //defender's hp cannot be less than 0
            } else{
                defender.getStats().hp -= stats.attack;
            }
            return true;
        } 
        //defender blocks damage of attacker
        return false;
    }
    
    function block() {
        return Math.random() > 0.5;
        //return false;
    }
    
    function getStats() {
        return stats;
    }
    
    function getCombatHistory() {
        return combatHistory;
    }
    
    return { 
        getName, fight, block, getStats, getCombatHistory
    }
}

var fighter1 = fighter({name: 'John', attack: 100, hp: 100});
var fighter2 = fighter({name: 'Kayn', attack: 50, hp: 300});
var fighter3 = fighter({name: 'Bill', attack: 40, hp: 100});

fighter1.fight(fighter2); // true, fighter 1 make damage to fighter 2
fighter1.fight(fighter3); // true, fighter 1 make damage to fighter 3

// /**
//  * Fighter John
//  * - Combat stats: { wins: 1, loses: 0 }
//  * - Properties: { name: 'John', attack: 100, hp: 100 }
//  */
showResult(fighter1);

// /** Fighter Kayn
//  * - Combat stats: { wins: 0, loses: 0 }
//  * - Properties: { name: 'Kayn', attack: 50, hp: 200 }
//  */
showResult(fighter2); 

// /**
//  * Fighter Bill
//  * - Combat stats: { wins: 0, loses: 1 }
//  * - Properties: { name: 'Bill', attack: 40, hp: 0 }
//  */
showResult(fighter3);