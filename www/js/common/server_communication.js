/**
 * Created by gxlzlihao on 16/6/17.
 */

var server_communication = {

    get_server_url_prefix: function() {
        var _rs = "http://114.215.82.131:8888/Time/services/";
        return _rs;
    },

    get_image_url_prefix: function() {
        var _rs = "http://114.215.82.131:8888/Time";
        return _rs;
    },

    do_get: function( _url, _data, _call_back ){

        server_communication.do_async_communication( "GET", _url, _data, _call_back );

    },

    do_post: function( _url, _data, _call_back ) {

        server_communication.do_async_communication( "POST", _url, _data, _call_back );

    },

    do_async_communication: function( _type, _url, _data, _call_back ) {

        $.ajax({
            type: _type,
            url: _url ,
            data: _data,
            async: true,
            complete: function( obj ){

                _call_back( obj.responseText );

            } ,
            dataType: 'json'
        });

    },

    homepage_news_list: function( _topic_id, _start, _count, _call_back ){
        var _url = server_communication.get_server_url_prefix() + "homepage/{" + _topic_id + "}?start=" + _start + "&count=" + _count;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    topic_list: function( _start, _count, _call_back ){
        var _url = server_communication.get_server_url_prefix() + "topic/?start=" + _start + "&count=" + _count;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    topic_details: function( _topic_id, _start, _count, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "topic/{" + _topic_id + "}?start=" + _start + "&count=" + _count;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    subscribe_recommendation: function( _data, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "subscribe/recommendation";
        console.log( _url );
        server_communication.do_post( _url, _data, _call_back );
    },

    subscribe_query: function( _key_word, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "subscribe/query?key_word=" + _key_word;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    news_details: function( _news_id, _news_type, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "news/{" + _news_id + "}?type=" + _news_type;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    news_comments: function( _news_id, _start, _count, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "comments/query?news_id=" + _news_id + "&start=" + _start + "&count=" + _count;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    discussion_room: function( _topic_id, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "topic/discussion?id=" + _topic_id;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    search_hints: function( _key_word, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "news/query?type=similar&key=" + _key_word;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    search_recommendation: function( _count, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "news/query?type=recommendation_keys&count=" + _count;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    },

    search_results: function( _key_word, _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "news/query?type=query&key=" + _key_word;
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
    }
};