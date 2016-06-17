/**
 * Created by gxlzlihao on 16/6/17.
 */

// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//
//         console.log('Received Event: ' + id);
//
//     }
// };
//
// app.initialize();

var server_communication = {

    do_get: function( _url, _data ){
        var _res = null;
        $.ajax({
            type: 'GET',
            url: _url ,
            success: function( _obj ){

                // console.log( _obj );
                alert( obj );
                _res = obj.responseText;

            } ,
            dataType: 'json'
        });
        return _res;
    },

    homepage_news_list: function( _topic_id, _start, _count ){
        var _url = "http://114.215.82.131:8888/Time/services/homepage/{" + _topic_id + "}?start=" + _start + "&count=" + _count;
        console.log( _url );
        var _res = server_communication.do_get( _url, null );
        return _res;
    },

    topic_list: function( _start, _count ){
        var _url = "http://114.215.82.131:8888/Time/services/topic/?start=" + _start + "&count=" + _count;
        console.log( _url );
        var _res = server_communication.do_get( _url, null );
        return _res;
    }
};