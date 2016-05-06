/**
 * Created by gxlzlihao on 16/4/27.
 */
$(document).ready(function(){
    $('button#search_submit').click(function(){
        console.log("Go to the search result page");
        window.location.href = window.location.href.replace('search.html', 'search_results.html');
    });

    $('img#top_back_button').click(function(){
        window.history.go(-1);
    });

});
