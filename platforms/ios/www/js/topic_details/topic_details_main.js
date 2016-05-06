/**
 * Created by gxlzlihao on 16/5/3.
 */
$(document).ready(function(){

    $('img#top_back_button').click(function(){
        window.history.go(-1);
    });

    $('div#main').children('div.news_item').click(function(){
        console.log( "Go to the news details page" );
        window.location.href = window.location.href.replace('topic_details.html', 'news_details.html');
    });

    $('div#discussion_room').click(function(){
        console.log( "Go to the discussion room page" );
        window.location.href = window.location.href.replace('topic_details.html', 'discussion_room.html');
    });

});
