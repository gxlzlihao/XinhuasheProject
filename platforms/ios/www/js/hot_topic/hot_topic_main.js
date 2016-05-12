/**
 * Created by gxlzlihao on 16/5/3.
 */

$(document).ready(function(){
    $('div.bottom_tab_item#bottom_homepage_item').click(function(){
        console.log( "Go to the home page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'index.html');
    });

    $('div.bottom_tab_item#bottom_topic_item').click(function(){
        // console.log( "Go to the hot topics page" );
        // window.location.href = window.location.href.replace('hot_topic.html', 'hot_topic.html');
    });

    $('div.bottom_tab_item#bottom_search_item').click(function(){
        console.log( "Go to the search page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'search.html');
    });

    $('div.bottom_tab_item#bottom_profile_item').click(function(){
        console.log( "Go to the profile page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'profile.html');
    });

    $('div.section').children('div.news_item').click(function(){
        console.log( "Go to the news details page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'news_details.html');
    });

    $('div.section').children('div.title').children('img').click(function(){
        console.log( "Go to the topic details page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'topic_details.html');
    });

    $('div.section').children('div.banner').click(function(){
        console.log( "Go to the topic details page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'topic_details.html');
    });

});
