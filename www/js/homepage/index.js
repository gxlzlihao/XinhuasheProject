/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var prepare_subscribe_topic_database = function( _db ) {

    function addSubscribeTopic( _id, _name ) {

        _db.transaction(function (tx) {

            var query = "INSERT INTO " + common.getLocalSubscribeTopicTag + " ( id, name ) VALUES (?,?)";

            tx.executeSql(query, [ _id, _name ], function(tx, res) {
                    console.log("insertId: " + res.insertId + " -- ");
                    console.log("rowsAffected: " + res.rowsAffected + " -- ");
                },
                function(tx, error) {
                    console.log('INSERT error: ' + error.message);
                });
        }, function(error) {
            console.log('transaction error: ' + error.message);
        }, function() {
            console.log('transaction ok -- succeeded adding one subscribe topic into SQL database.');
        });
    }

    _db.executeSql('CREATE TABLE IF NOT EXISTS ' + common.getLocalSubscribeTopicTag() + ' ( id string primary key, name string ) ');
    _db.executeSql('SELECT id, name FROM ' + common.getLocalSubscribeTopicTag() , [], function( res ) {
        if ( res.rows.length == 0 ) {
            var _subscribe_topics = new Array();

            for ( var p = 0; p < common.getDefaultSubscribeTopicIds.length; ++p ) {
                _subscribe_topics.push( JSON.parse( "{'id':'" + common.getDefaultSubscribeTopicIds()[p] + "', 'name':'" + common.getDefaultSubscribeTopicNames()[p] + "'}" ) );
                addSubscribeTopic( common.getDefaultSubscribeTopicIds()[p], common.getDefaultSubscribeTopicNames()[p] );
            }

            window.localStorage.setItem( common.getLocalSubscribeTopicTag(), JSON.stringify( _subscribe_topics ) );

        } else {
            var _array = new Array();
            for ( var j = 0; j < res.rows.length; ++j ) {
                var _item = res.rows.item(j);
                var _obj = new Object();
                _obj.id = _item.id;
                _obj.name = _item.name;
                _array.push( _obj );

                console.log( "received one item with id:" + _obj.id + " and name:" + _obj.name );
            }
            window.localStorage.setItem( common.getLocalSubscribeTopicTag, JSON.stringify( _array ) );
        }
    });

    _db.close(function() {
        console.log('database is closed ok');
    });

}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var _db = common.getDatabaseHandler();
        prepare_subscribe_topic_database( _db );

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();


$(document).ready(function(){

    var _subscribe_topics = new Array();
    if ( window.localStorage.getItem( common.getLocalSubscribeTopicTag() ) == null ) {

        var _db = common.getDatabaseHandler();
        prepare_subscribe_topic_database( _db );

        _subscribe_topics = window.localStorage.getItem( common.getLocalSubscribeTopicTag() );
    } else {
        _subscribe_topics = JSON.parse( window.localStorage.getItem( common.getLocalSubscribeTopicTag() ) );
    }

    for ( var i = 0; i < _subscribe_topics.length; ++i ) {
        var _topic = $("<div class='navigation_item'><span class='subscribe_topic_id'>" + _subscribe_topics[i].id + "</span><span>" + _subscribe_topics[i].name + "</span></div>");
        _topic.appendTo( $('div.navigation_area') );
    }
    $('div.navigation_item').first().addClass('active');

    var _current_start_index = 0;
    var _current_count_index = 4;
    var _current_subscribe_id = $('div.navigation_item.active').children('span.subscribe_topic_id').text();

    var process_homepage_data = function( _d ){

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            for ( var i = 0; i < _data.length; ++i ) {
                var _item = _data[i];
                if ( _current_start_index == 0 && i == 0 ) {
                    // insert the head news
                    var _id = _item.id;
                    var _title = _item.title;
                    var _image_url = server_communication.get_image_url_prefix() + _item.image_url;
                    var _headline = $("<div class='headline_item'>" +
                        "<image src=" + _image_url + " alt=" + _image_url + "></image>" +
                        "<span>" + _title + "</span>" +
                        "</div>");
                    _headline.appendTo( $('div.content_window') );
                    _headline.click( function(){
                        window.location.href = window.location.href.replace( 'index.html', 'news_details.html?news_id=' + _id + "&type=column" );
                    } );
                } else {
                    // insert one news item
                    var _id = _item.id;
                    var _title = _item.title;
                    var _brief_description = _item.brief_description;

                    if ( _brief_description.length > 40 ) {
                        _brief_description = _brief_description.substring( 0, 40 );
                        _brief_description = _brief_description + "...";
                    }

                    var _number_comments = _item.number_comments;
                    var _time_stamp = _item.time_stamp;
                    var _image_url = server_communication.get_image_url_prefix() + _item.image_url;
                    var _ago = common.timeAgo( _time_stamp );

                    var _news_item = $("<div class='news_item'>" +
                        "<span class='news_id'>" + _id + "</span>" +
                        "<image src=" + _image_url + " alt=" + _image_url + "></image>" +
                        "<div class='news_content'>" +
                        "<span class='news_title'>" + _title + "</span>" +
                        "<p class='news_brief_description'>" + _brief_description + "</p>" +
                        "<div class='news_infor'>" +
                        "<span class='news_comemnt_count'>" + _number_comments + "条评论</span>" +
                        "<span class='news_time_ago'>" + _ago + "前</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                    _news_item.appendTo( $('div.content_window') );
                    _news_item.click( function(){
                        window.location.href = window.location.href.replace( 'index.html', 'news_details.html?news_id=' + _id + "&type=column" );
                    } );
                }
            }
        }
        
    };

    server_communication.homepage_news_list( _current_subscribe_id, _current_start_index, _current_count_index, process_homepage_data );

    $('div.content_window').scroll(function(){
        if ( this.scrollTop + this.clientHeight >= this.scrollHeight ) {
            console.log( "scroll content window to the bottom, update the news list." );
            _current_start_index = _current_start_index + _current_count_index;
            server_communication.homepage_news_list( _current_subscribe_id, _current_start_index, _current_count_index, process_homepage_data );
        }
    });

    var navigation_item_number = $('div.navigation_bar').children('div.navigation_window').children('div.navigation_area').children('div.navigation_item').length;
    $('div.navigation_area').css({'width':( navigation_item_number * 105 ) +'px'});

    $('div.navigation_bar').children('div.navigation_window').children('div.navigation_area').children('div.navigation_item').each(function(){
        // when the navigation item is clicked
        $(this).click(function(){
            $(this).siblings('div.navigation_item').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            _current_subscribe_id = $(this).children('span.subscribe_topic_id').text();
            $('div.content_window').empty();
            _current_start_index = 0;
            _current_count_index = 4;
            server_communication.homepage_news_list( _current_subscribe_id, _current_start_index, _current_count_index, process_homepage_data );
        });
    });
    
    $('div.bottom_tab_item').click(function(){
        if ( $(this).attr('id') != 'bottom_loading_item' ) {
            $(this).siblings('div.bottom_tab_item').each(function() {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            var current_item_id = $(this).attr('id');
            if( current_item_id == 'bottom_topic_item' ) {
                // TODO: switch the displayed content to the hot topic page
            }
            if ( current_item_id == 'bottom_search_item' ) {
                // TODo: switch the displayed content to the search page
            }
            if ( current_item_id == 'bottom_profile_item' ) {
                // TODO:  switch the displayed content to the user profile page
            }
        }
    });

    $('div.bottom_tab_item#bottom_topic_item').click(function(){
        console.log( "Go to the hot topics page" );
        window.location.href = window.location.href.replace('index.html', 'hot_topic.html');
    });

    $('div.bottom_tab_item#bottom_search_item').click(function(){
        console.log( "Go to the search page" );
        window.location.href = window.location.href.replace('index.html', 'search.html');
    });

    $('div.bottom_tab_item#bottom_profile_item').click(function(){
        console.log( "Go to the profile page" );
        window.location.href = window.location.href.replace('index.html', 'profile.html');
    });

    $('div#edit_subscribes').click(function(){
        console.log( "Go to the subscribe page" );
        window.location.href = window.location.href.replace('index.html', 'subscribe.html');
    });

});
