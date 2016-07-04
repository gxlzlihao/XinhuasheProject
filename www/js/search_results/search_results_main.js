/**
 * Created by gxlzlihao on 16/4/27.
 */
$(document).ready(function(){

    $('button#search_submit').click(function(){
        var _input_key_word = $('div.input_field').children('input').val();

        console.log( "Go to the search result page with new key word - " + _input_key_word );
        var _ss = window.location.href.split('/');
        var _base = _ss[0] + "/" + _ss[1] + "/" + _ss[2] + "/";
        var _new_url = _base + 'search_results.html?key_word=' + _input_key_word;
        window.location.href = _new_url;
    });

    var _key_word = common.getUrlParam( "key_word" );

    var process_search_results = function( _d ) {
        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
            // window.history.go(-1);
        } else {
            var _news_results = _data.news_results;
            var _topic_results = _data.topic_results;

            var _topic_section = $('div.result_item').first();
            var _news_section = $('div.result_item').last();

            for ( var i = 0; i < _topic_results.length; ++i ) {
                var _topic_item = _topic_results[i];
                var _n = $("<div class='topic_result_item'>" +
                        "<div class='title'>" +
                            "<span class='title'>" + _topic_item.title + "</span>" +
                            "<image class='enter_details' src='img/search_results/arrow_right_gray.png' alt='img/search_results/arrow_right_gray.png'></image>" +
                            "<span class='topic_id' style='display:none'>" + _topic_item.id + "</span>" +
                        "</div>" +
                        "<div class='banner'>" +
                            "<image src=" + server_communication.get_image_url_prefix() + _topic_item.image_url + " alt=" + server_communication.get_image_url_prefix() + _topic_item.image_url + "></image>" +
                        "</div></div>");
                _n.appendTo( _topic_section );
                _n.click(function(){
                    console.log("Go to the topic details page");
                    window.location.href = window.location.href.replace( 'search_results.html', 'topic_details.html?topic_id=' + _topic_item.id );
                });
            }

            for ( var j = 0; j < _news_results.length; ++j ) {
                var _news_item = _news_results[j];
                var _n = "<div class='news_result_item'>" +
                    "<div class='left'>" +
                        "<image src=" + server_communication.get_image_url_prefix() + _news_item.image_url + " alt=" + server_communication.get_image_url_prefix() + _news_item.image_url + "></image>" +
                    "</div>" +
                    "<div class='right'>" +
                        "<div class='news_title'>" +
                            "<span>" + _news_item.title + "</span>" +
                        "</div>" +
                        "<div class='news_item_info'>" +
                            "<div class='reliability'>";

                if ( _news_item.reliability == 1 ) {
                    _n = _n + "<image src='img/search_results/credit_green.png' alt='img/search_results/credit_green.png'></image>" +
                        "<span>信</span>";
                } else if ( _news_item.reliability == 0 ) {
                    _n = _n + "<image src='img/search_results/credit_orange.png' alt='img/search_results/credit_orange.png'></image>" +
                        "<span>疑</span>";
                } else if ( _news_item.reliability == -1 ) {
                    _n = _n + "<image src='img/search_results/credit_red.png' alt='img/search_results/credit_red.png'></image>" +
                        "<span>谣</span>";
                }

                _n = _n +            "</div>" +
                            "<span class='news_source'>" + _news_item.source + "</span>" +
                            "<span class='news_comment_count'>" + _news_item.comment_count + "条评论</span>" +
                        "</div></div></div>";
                _n = $( _n );
                _n.appendTo( _news_section );
                _n.click(function(){
                    console.log("Go to the news details page");
                    window.location.href = window.location.href.replace('search_results.html', 'news_details.html?news_id=' + _news_item.id + '&type=column');
                });
            }
        }
    }

    server_communication.search_results( _key_word, process_search_results );

    $('div#top_bar').children('img.top_back_button').click(function(){
        window.history.go(-1);
    });

});
