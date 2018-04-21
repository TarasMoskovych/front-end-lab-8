const root = document.querySelector(".root");

const render = () => {
    root.innerHTML =
        "<div class='calculator'>" +
            "<div class='screen'>" +
                "<div class='result'>" +
                    "<span>0</span>" +
                "</div>" +
            "</div>" +
            "<table class='table'>" +
                "<tr>" +
                    "<td colspan='2'><button value='' class='operation'>C</button></td>" +
                    "<td><button class='operation'>&larr;</button></td>" +
                    "<td><button class='operation'>&plusmn;</button></td>" +
                    "<td><button value='sup' class='operation'>x&sup2;</button></td>" +
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
};

export default function(){
    render();
}