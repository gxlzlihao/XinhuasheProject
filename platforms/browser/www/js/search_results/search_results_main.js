/**
 * Created by gxlzlihao on 16/4/27.
 */
$(document).ready(function(){

    $('div.topic_result_item').click(function(){
        console.log("Go to the topic details page");
        window.location.href = window.location.href.replace('search_results.html', 'topic_details.html');
    });

    $('div.news_result_item').click(function(){
        console.log("Go to the news details page");
        window.location.href = window.location.href.replace('search_results.html', 'news_details.html');
    });

    $('div#top_bar').children('img.top_back_button').click(function(){
        window.history.go(-1);
    });

});
