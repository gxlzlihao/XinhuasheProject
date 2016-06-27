/**
 * Created by gxlzlihao on 16/4/27.
 */

$(document).ready(function(){

    var _news_id = common.getUrlParam( 'news_id' );
    var _news_type = common.getUrlParam( 'type' );

    var _comment_start_index = 0;
    var _comment_count_index = 5;
    var _comment_total = 0;

    var process_news_details = function( _d ) {

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
            window.history.go( -1 );
        } else {
            var _news_id = _data.id;
            var _news_title = _data.title;
            var _news_comment_count = _data.comment_count;

            _comment_total = _news_comment_count;

            var _news_source = _data.source;
            var _news_time = _data.time;
            var _news_content = _data.content;

            $('span#news_id').text( _news_id );
            $('span#news_title').text( _news_title );
            $('div.news_source').children('span').text( _news_source );
            $('div.news_time').children('span').text( _news_time );
            $('div.comment_count').children('span').text( _news_comment_count );

            for ( var j = 0; j < _news_content.length; ++j ) {
                var _item = _news_content[j];
                if ( _item.text != undefined ) {
                    var _new_p = $( "<p>" + _item.text + "</p>" );
                    _new_p.appendTo( $('div.news_content') );
                } else if ( _item.pictureUrl != undefined || _item.pictrueUrl != undefined ) {
                    var _url = server_communication.get_image_url_prefix() + _item.pictrueUrl;
                    var _new_img = $( "<image src=" + _url + " alt=" + _url + "></image>" );
                    _new_img.appendTo( $('div.news_content') );
                }
            }

            if ( $('div#comment_panel').length <= 0 ) {
                $("<div id='comment_panel'><h1 class='title'>评论</h1></div>").appendTo( $('div.news_content') );
            }
        }
    }

    server_communication.news_details( _news_id, _news_type, process_news_details );

    var process_news_comments = function( _d ) {

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            for ( var j = 0; j < _data.length; ++j ) {
                var _item = _data[j];
                var _time = _item.time;
                var _text = _item.text;

                var _comment_item = $("<div class='comment_item'>" +
                    "<div class='left'>" +
                    "    <div class='avatar'>" +
                    "        <image src='img/news_details/avatar1.png' alt='img/news_details/avatar1.png'></image>" +
                    "    </div>" +
                    "</div>" +
                    "<div class='right'>" +
                    "    <span class='user_name'>匿名用户</span>" +
                    "    <span class='time_stamp'>" + _time + "</span>" +
                    "    <p>" + _text + "</p>" +
                    "</div></div>");
                _comment_item.appendTo( $('div#comment_panel') );
            }
        }
    }

    $('div.content').scroll(function(){
        if ( this.scrollTop + this.clientHeight >= this.scrollHeight ) {
            console.log( "scroll div.content to the bottom, update the news list." );
            if (  _comment_start_index < _comment_total ) {
                server_communication.news_comments(_news_id, _comment_start_index, _comment_count_index, process_news_comments);
                _comment_start_index = _comment_start_index + _comment_count_index;
            }
        }
    });

    $('img#top_back_button').click(function(){
        window.history.go(-1);
    });

    if ( $('div.subscribe_area').children('div.subscribe_item').length < 3 ) {
        $('img#right_more').css({'display':'none'});
    }

    $('div.subscribe_window').scroll(function(){
        // if ( $('img#right_more').css('display') == 'block' ) {
        //     $('img#right_more').css({'right':'20px'});
        // }

        if ( this.scrollLeft + this.clientWidth >= this.scrollWidth ) {
            $('img#right_more').css({'display':'none'});
        } else {
            $('img#right_more').css({'display':'block'});
        }
    });

});
