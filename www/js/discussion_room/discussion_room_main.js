/**
 * Created by gxlzlihao on 16/5/5.
 */

$(document).ready(function(){

    $('div.section#opinions').children('div.content').children('div.item').each(function(){
        var percentage_value = $(this).children('div.percentage_area').children('span').text();
        $(this).children('div.percentage_area').children('div').css({ 'width':percentage_value });
    });

    var total_number = 0;

    $('div.section#related_people div.content').children('div.item').each(function(){
        var _v = $(this).children('div.number_area').children('span').text();
        total_number = total_number + parseInt( _v );
    });

    $('div.section#related_people div.content').children('div.item').each(function(){
        var _v = $(this).children('div.number_area').children('span').text();
        $(this).children('div.number_area').children('div').css({ 'width': ( parseInt(_v) / total_number * 100 ) + "%" });
    });

});
