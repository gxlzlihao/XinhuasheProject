/**
 * Created by gxlzlihao on 16/5/3.
 */
$(document).ready(function(){

    var _topic_id = getUrlParam( "topic_id" );

    var _current_start_index = 0;
    var _current_count_index = 5;

    var process_topic_details = function( _d ) {

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
            window.history.go( -1 );
        } else {
            var _topic_id = _data.id;
            var _banner_image_url = _data.image_url;
            var _title = _data.title;
            var _news = _data.news;

            $('h1#topic_title').text( _title );
            $('img#top_background').attr( 'src', server_communication.get_image_url_prefix() + _banner_image_url );
            $('img#top_background').attr( 'alt', server_communication.get_image_url_prefix() + _banner_image_url );

            for ( var j = 0; j < _news.length; ++j ) {

                var _item = _news[j];
                var _image_url = server_communication.get_image_url_prefix() + _item.image_url;

                var _new_item = $("<div class='news_item'>" +
                    "<div class='left'>" +
                    "   <image src=" + _image_url + " alt=" + _image_url + "></image>" +
                    "</div>" +
                    "<div class='right'>" +
                    "    <h1 class='news_id' style='display:none'>" + _item.id + "</h1>" +
                    "    <h1>" + _item.title + "</h1>" +
                    "    <p>" + _item.brief_description + "</p>" +
                    "    <div class='news_item_info'>" +
                    "        <div class='reliability'>" +
                    "        <image src='img/topic_details/credit_orange.png' alt='img/topic_details/credit_orange.png'></image>" +
                    "        <span>疑</span>" +
                    "        </div>" +
                    "        <span class='news_item_source'>" + _item.source + "</span>" +
                    "        <span class='news_item_comment_count'>" + _item.comment_count + "次评论</span>" +
                    "    </div>" +
                    "</div></div>");
                _new_item.appendTo( $('div#main') );
            }
        }
    };

    server_communication.topic_details( _topic_id, _current_start_index, _current_count_index, process_topic_details );

    $('div#wrapper').scroll(function(){
        if ( this.scrollTop + this.clientHeight >= this.scrollHeight ) {
            console.log( "scroll div#wrapper to the bottom, update the news list." );
            _current_start_index = _current_start_index + _current_count_index;
            server_communication.topic_details( _topic_id, _current_start_index, _current_count_index, process_topic_details );
        }
    });

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
