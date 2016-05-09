/**
 * Created by gxlzlihao on 16/4/27.
 */

$(document).ready(function(){

    $('img#top_back_button').click(function(){
        window.history.go(-1);
    });

    if ( $('div.subscribe_area').children('div.subscribe_item').length < 3 ) {
        $('img#right_more').css({'display':'none'});
    }

    $('div.subscribe_window').scroll(function(){
        if ( $('img#right_more').css('display') == 'block' ) {
            var _n = $('img#right_more').clone();
            $('img#right_more').remove();
            _n.appendTo('div.subscribe_window');
        }

        console.log( "the right value of right arrow: " + $('img#right_more').scrollSnapPointsX );

        if ( this.scrollLeft + this.clientWidth >= this.scrollWidth ) {
            $('img#right_more').css({'display':'none'});
        } else {
            $('img#right_more').css({'display':'block'});
        }
    });

});
