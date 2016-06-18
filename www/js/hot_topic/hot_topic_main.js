/**
 * Created by gxlzlihao on 16/5/3.
 */

$(document).ready(function(){
    $('div.bottom_tab_item#bottom_homepage_item').click(function(){
        console.log( "Go to the home page" );
        window.location.href = window.location.href.replace('hot_topic.html', 'index.html');
    });

    var _current_start_index = 0;
    var _current_count_index = 4;

    var process_topic_list = function( _d ) {

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            for ( var i = 0; i < _data.length; ++i ) {
                var _item = _data[i];
                var _topic_id = _item.id;
                var _title = _item.title;
                var _news_list = _item.news;
                var _banner_image_url = null;
                if (  _item.image_url != undefined && _item.image_url != null ) {
                    _banner_image_url = server_communication.get_image_url_prefix() + _item.image_url;
                }

                var _new_section = "<div class='section'>" +
                        "<div class='title'>" +
                        "<span>" + _title + "</span>" +
                        "<image src='img/hot_topic/arrow_right_gray.png' alt='img/hot_topic/arrow_right_gray.png'></image>" +
                        "<h5 class='topic_id' style='display:none'>" + _topic_id + "</h5>" +
                        "</div>";

                if ( _banner_image_url != null ) {
                        _new_section = _new_section + "<div class='banner'>" +
                            "<image src=" + _banner_image_url + " alt=" + _banner_image_url + "></image>" +
                            "</div>";
                }
                if ( _news_list != undefined && _news_list != null && _news_list.length > 0 ) {
                    for ( var j = 0; j < _news_list.length; ++j ) {
                        var _news_item = _news_list[j];
                        var _news_id = _news_item.id;
                        var _news_title = _news_item.title;
                        var _news_brief_description = _news_item.brief_description;
                        var _news_comment_count = _news_item.comment_count;
                        var _news_time = _news_item.time;
                        var _news_source = _news_item.source;
                        var _news_image_url = server_communication.get_image_url_prefix() + _news_item.image_url;

                        _new_section = _new_section + "<div class='news_item'>" +
                                "<div class='left'>" +
                                "<h5 class='news_id' style='display:none'>" + _news_id + "</h5>" +
                                "    <image src=" + _news_image_url + " alt=" + _news_image_url + "></image>" +
                                "</div>" +
                                "<div class='right'>" +
                                "    <h1>" + _news_title + "</h1>" +
                                "    <p>" + _news_brief_description + "</p>" +
                                "    <div class='news_item_info'>" +
                                "        <div class='reliability'>" +
                                "            <image src='img/hot_topic/credit_green.png' alt='img/hot_topic/credit_green.png'></image>" +
                                "            <span>信</span>" +
                                "        </div>" +
                                "        <span class='news_item_source'>" + _news_source + "</span>" +
                                "        <span class='news_item_comment_count'>" + _news_comment_count + "次评论</span>" +
                                "    </div>" +
                                "</div></div>";
                    }
                }
                _new_section = _new_section + "</div>";
                _new_section = $( _new_section );
                _new_section.appendTo( $('div#main') );

                _new_section.children('div.title').children('img').click(function(){
                    console.log( "Go to the topic details page" );
                    window.location.href = window.location.href.replace('hot_topic.html', 'topic_details.html');
                });

                _new_section.children('div.banner').click(function(){
                    console.log( "Go to the topic details page" );
                    window.location.href = window.location.href.replace('hot_topic.html', 'topic_details.html');
                });

                _new_section.children('div.news_item').click(function(){
                    console.log( "Go to the news details page" );
                    window.location.href = window.location.href.replace('hot_topic.html', 'news_details.html');
                });
            }
        }
    }

    server_communication.topic_list( _current_start_index, _current_count_index, process_topic_list );

    $('div#main').scroll(function(){
        if ( this.scrollTop + this.clientHeight >= this.scrollHeight ) {
            console.log( "scroll div#main to the bottom, update the news list." );
            _current_start_index = _current_start_index + _current_count_index;
            server_communication.topic_list( _current_start_index, _current_count_index, process_topic_list );
        }
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

});
