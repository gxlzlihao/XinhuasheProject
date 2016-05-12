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

});
