var a = parseFloat(prompt("Input first side of triangle:"));
var b = parseFloat(prompt("Input second side of triangle:"));
var c = parseFloat(prompt("Input third side of triangle:"));


if(isNaN(a) || isNaN(b) || isNaN(c) || a + b <= c || a + c <= b ||  b + c <= a){
    console.log("Incorrect data");  
} else{    
    var p = (a + b + c) / 2;
    var s = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    
    if((s % 1) != 0){
        s = s.toFixed(2); 
    } 
    
    console.log("Type of triangle is " + getTypeOfTriangle(a, b, c) + " triangle and square is " + s);
}


function getTypeOfTriangle (a, b, c){ 
    if((a * a + b * b == c * c) || (a * a + c * c == b * b) || (c * c + b * b == a * a)) return "right";
    else if(a == b && b == c ) return "equilateral";
    else if(a == b || a == c || b == c) return "isosceles";
    else return "scalene";
}