$(function () {
    let board = $(".board");
    let restartButton = $(".restart");
    let field = [], white;
    let labels = $(".labels");
    restart();

    for(let i = 0; i < 15 * 15; i++){
        board.append($("<div>").addClass("block"));
    }

    restartButton.on("click", function (){
        restart();
    });

    function setClick() {
        board.on("click", function(e) {
            let axisX = Math.abs(Math.round((event.pageX - board.offset().left) / 25));
            let axisY = Math.abs(Math.round((event.pageY - board.offset().top) / 25));
            let stone = $("<span>");
            stone.css({"left": `${axisX * 25 - 10}px`, "top": `${axisY * 25 - 10}px`});

            if (field[axisX][axisY] === false) {
                if (white) {
                    animateLabels("black");
                    stone.addClass("white");
                    field[axisX][axisY] = "white";
                    white = false;
                } else {
                    animateLabels("white");
                    stone.addClass("black");
                    field[axisX][axisY] = "black";
                    white = true;
                }
                board.append(stone);
                checking(field, "black");
                checking(field, "white");;
            }
        });
    }

    function checking(arr, color){
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 16; j++){
                if(arr[i][j] === color && arr[i][j+1] === color && arr[i][j+2] === color && arr[i][j+3] === color){
                    victory(color);
                } else if(arr[i][j] === color && arr[i+1][j] === color && arr[i+2][j] === color && arr[i+3][j] === color){
                    victory(color);
                } else if(arr[i][j] === color && arr[i+1][j+1] === color && arr[i+2][j+2] === color && arr[i+3][j+3] === color){
                    victory(color);
                } else if(arr[i][j] === color && arr[i+1][j-1] === color && arr[i+2][j-2] === color && arr[i+3][j-3] === color){
                    victory(color);
                }
            }
        }
    }

    function victory(color) {
        board.off("click");
        $(".label-black").css({"display": "none"});
        $(".label-white").css({"display": "none"});
        $(".label-result").text(`${color} wins!`).css({"display": "block"});
    }

    function restart() {
        setClick();
        $(".label-result").css({"display": "none"});
        $(".label-black").css({"display": "block"});
        $(".label-white").css({"display": "block"});
        board.css({"opacity": "0"}).animate({"opacity": "1"}, 300);
        for(let i = 0; i <= 16; i++) {
            field[i] = [];
            for (let j = 0; j <= 16; j++) {
                field[i][j] = false;
            }
        }
        board.find("span").remove();
        white = Math.random() > .5;

        if(white){
            animateLabels("white");
        } else {
            animateLabels("black");
        }
    }

    function animateLabels(className) {
        if(className === "black"){
            $(".label-black").animate({"opacity": "1"}, 200);
            $(".label-white").animate({"opacity": "0"}, 200);
        }
        if(className === "white"){
            $(".label-white").animate({"opacity": "1"}, 200);
            $(".label-black").animate({"opacity": "0"}, 200);
        }
    }
});