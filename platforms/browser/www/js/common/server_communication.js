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

        $.ajax({
            type: 'GET',
            url: _url ,
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

    subscribe_recommendation: function( _call_back ) {
        var _url = server_communication.get_server_url_prefix() + "subscribe/recommendation";
        console.log( _url );
        server_communication.do_get( _url, null, _call_back );
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
    }
};