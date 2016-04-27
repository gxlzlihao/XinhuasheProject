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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    }
};

app.initialize();


$(document).ready(function(){

    var navigation_item_number = $('div.navigation_bar').children('div.navigation_window').children('div.navigation_area').children('div.navigation_item').length;
    $('div.navigation_area').css({'width':( navigation_item_number * 105 ) +'px'});

    $('div.navigation_bar').children('div.navigation_window').children('div.navigation_area').children('div.navigation_item').each(function(){
        // when the navigation item is clicked
        $(this).click(function(){
            $(this).siblings('div.navigation_item').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
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

    $('div.bottom_tab_item#bottom_loading_item').mousedown(function(){
        $(this).children('span').css({'color':'#1788ed'});
    });
    $('div.bottom_tab_item#bottom_loading_item').mouseup(function(){
        $(this).children('span').css({'color':'#666666'});
    });
});