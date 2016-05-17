/**
 * Created by gxlzlihao on 16/5/12.
 */

$(document).ready(function(){

    $('div#favorite_item').click(function(){
        console.log("Go to the favourite list page");
        window.location.href = window.location.href.replace('profile.html', 'profile_favourite.html');
    });

    $('div#comment_item').click(function(){
        console.log("Go to the user comment list page");
        window.location.href = window.location.href.replace('profile.html', 'profile_comment.html');
    });

    $('div.bottom_tab_item#bottom_topic_item').click(function(){
        console.log( "Go to the hot topics page" );
        window.location.href = window.location.href.replace('profile.html', 'hot_topic.html');
    });

    $('div.bottom_tab_item#bottom_search_item').click(function(){
        console.log( "Go to the search page" );
        window.location.href = window.location.href.replace('profile.html', 'search.html');
    });

    $('div.bottom_tab_item#bottom_homepage_item').click(function(){
        console.log( "Go to the index page" );
        window.location.href = window.location.href.replace('profile.html', 'index.html');
    });

});
