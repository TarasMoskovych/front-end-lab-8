$(window).load(function(){
    var maxHeight = 0;
    for( var i=0; i < $('.category-unit').length; i++) {
        if ($('.category-unit').eq(i).height() > maxHeight) {
            maxHeight = $('.category-unit').eq(i).height()
        }
    }
    for( var i=0; i < $('.category-unit').length; i++) {
        $('.category-unit').eq(i).css('height', maxHeight);
    }
});