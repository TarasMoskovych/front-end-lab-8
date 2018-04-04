$(function () {
    let current, white = "white", black = "black";

    if(Math.random() > 0.5){
        current = white;
    } else {
        current = black;
    }

    let root = $(".board");

    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 15; j++){
            root.append($("<div>").addClass("block"));
        }
    }

    $(".block").on("click", function(){
        $(this).addClass('move');

        if(current === white){
            if(!$(this).hasClass(white) && !$(this).hasClass(black)){
                $(this).addClass(white);
                current = black;
            }
        }

        if(current === black){
            if(!$(this).hasClass(white) && !$(this).hasClass(black)){
                $(this).addClass(black);
                current = white;
            }
        }
    });

});