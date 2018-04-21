import screen from "./interface-module";
let res;

export const calc = (a, b, sign, reset) => {
    switch(sign) {
        case '+':
            res = String(Number(a) + Number(b));
            screen.innerHTML = res.slice(0, 8);
            reset();
            break;

        case '-':
            res = String(Number(a) - Number(b));
            screen.innerHTML = res.slice(0, 8);
            reset();
            break;

        case '*':
            res = String(Number(a) * Number(b));
            screen.innerHTML = res.slice(0, 8);
            reset();
            break;

        case '^':
            res = String(Number(a) * Number(a));
            screen.innerHTML = res.slice(0, 8);
            reset();
            break;

        case 'sqrt':
            res = String(Math.sqrt(Number(a)));
            screen.innerHTML = res.slice(0, 8);
            reset();
            break;

        case '1/x':
            res = String(1 / Number(a));
            screen.innerHTML = res.slice(0, 8);
            reset();
            break;

        case '/':
            if(b === '0') {
                res = "Infinity";
                screen.innerHTML = res;
                reset();
                break;
            } else {
                res = String(Number(a) / Number(b));
                screen.innerHTML = res.slice(0,8);
                reset();
                break;
            }
    }
};