import {calc} from "./calculating-module";

const root = document.querySelector(".root");
let a = "", b = "", sign = "", symbol = "", aArr, bArr;

(() => {
    root.innerHTML =
        "<div class='calculator'>" +
            "<div class='wrapper'>" +
                "<div class='screen'>" +
                    "<span>0</span>" +
                "</div>" +
            "</div>" +
            "<table class='table'>" +
                "<tr>" +
                    "<td colspan='2'><button value='clear' class='operation'>C</button></td>" +
                    "<td><button value='delete' class='operation'>&larr;</button></td>" +
                    "<td><button value='+-' class='operation'>&plusmn;</button></td>" +
                    "<td><button value='^' class='operation'>x&sup2;</button></td>" +
                "</tr>" +
                "<tr>" +
                    "<td><button value='7'>7</button></td>" +
                    "<td><button value='8'>8</button></td>" +
                    "<td><button value='9'>9</button></td>" +
                    "<td><button value='+' class='operation'>+</button></td>" +
                    "<td><button value='sqrt' class='operation'>&radic;</button></td>" +
                "</tr>" +
                "<tr>" +
                    "<td><button value='4'>4</button></td>" +
                    "<td><button value='5'>5</button></td>" +
                    "<td><button value='6'>6</button></td>" +
                    "<td><button value='-' class='operation'>-</button></td>" +
                    "<td><button value='1/x' class='operation'>1/x</button></td>" +
                "</tr>" +
                "<tr>" +
                    "<td><button value='1'>1</button></td>" +
                    "<td><button value='2'>2</button></td>" +
                    "<td><button value='3'>3</button></td>" +
                    "<td><button value='*' class='operation'>&times;</button></td>" +
                    "<td rowspan='2'><button value='=' class='equal operation'>=</button></td>" +
                "</tr>" +
                "<tr>" +
                    "<td colspan='2'><button value='0'>0</button></td>" +
                    "<td><button value='.'>.</button></td>" +
                    "<td><button value='/' class='operation'>&divide;</button></td>" +
                "</tr>" +
            "</table>" +
        "</div>"
})();

let screen = document.querySelector(".screen");

document.querySelector(".table").addEventListener("click", event => {
    if(event.target.matches("button")){
        parse(event.target);
    }
});

const reset = () => {
    a = "";
    b = "";
    aArr = "";
    bArr = "";
    sign = "";
    symbol = "";
};

const clear = () => {
    reset();
    screen.innerHTML = "<span>0</span>";
};

const del = () => {
    if(a !== "" && sign !== "") {
        if(b === "") {
            sign = "";
            screen.innerHTML = a;
        } else {
            bArr = [];
            bArr = b.split("");
            bArr.pop();
            b = bArr.join("");
            screen.innerHTML = a + symbol + b;
        }
    } else if(a !== "" && sign === "") {
        aArr = [];
        aArr = a.split("");
        aArr.pop();
        a = aArr.join("");
        screen.innerHTML = a;
    } if(a === ""){
        clear();
    }
};

const parse = input => {
    if(input.value === "clear"){
        clear();
    } else if(input.value === "delete"){
        del();
    } else if(input.value === "=") {
        if(a !== "" && b === "" && sign === "^" || sign === "sqrt" || sign === "1/x"){
            calc(a, b, sign, reset);
        } else if(a !== "" && b !== "") {
            calc(a, b, sign, reset);
        }
    } else if(input.value==="+" || input.value==="-" || input.value==="*" || input.value==="/" ||
        input.value === "^" || input.value === "sqrt" || input.value === "1/x" || input.value === "+-") {

        if(a !== "" && b === "") {
            sign = input.value;
            symbol = input.textContent;

            if(input.value === "+-"){
                a *= -1;
                screen.innerHTML = a;
            } else if(input.value === "^"){
                symbol = input.textContent.substring(1);
                screen.innerHTML = a + symbol;
            } else if(input.value === "sqrt"){
                screen.innerHTML = `${symbol}(${a})`;
            } else if(input.value === "1/x"){
                screen.innerHTML = `1/${a}`;
            } else {
                screen.innerHTML = a + symbol;
            }
        } else if(a !== "" && b !== "") {
            calc(a, b, sign, reset);
            sign = input.value;
            symbol = input.textContent;
            screen.innerHTML = a + symbol;
        }
    } else {
        if(sign === "") {
            a = a + input.value;
            screen.innerHTML = a;
        } else if(sign) {
            b = b + input.value;
            screen.innerHTML = a + symbol + b;
        }
    }
};

export default screen;