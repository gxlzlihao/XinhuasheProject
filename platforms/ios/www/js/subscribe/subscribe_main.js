/**
 * Created by gxlzlihao on 16/4/27.
 */

$(document).ready(function(){
    $('div#exit').click(function(){
        window.history.go(-1);
    });
    
    $('button#subscribe_edit').click(function(){
        $(this).addClass('hide');
        $('button#subscribe_edit_done').removeClass('hide');
        $('div#current_subscribe').children('div.subscribe_item').each(function(){
            $(this).children('img').css({'display':'block'});
        });
    });

    $('button#subscribe_edit_done').click(function(){
        $(this).addClass('hide');
        $('button#subscribe_edit').removeClass('hide');
        $('div#current_subscribe').children('div.subscribe_item').each(function(){
            $(this).children('img').css({'display':'none'});
        });
    });

    $('div#current_subscribe div.subscribe_item').children('img').click(function(){
        $(this).parent().remove();

    //    TODO: remove the subscribe item from the database
    });
});
