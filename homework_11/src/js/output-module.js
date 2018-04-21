import screen from "./interface-module";
import style from '../styles/styles.css';

export const output = (res) => {
    screen.innerHTML = res.slice(0, 12);
};