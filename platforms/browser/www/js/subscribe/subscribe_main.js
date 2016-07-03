/**
 * Created by gxlzlihao on 16/4/27.
 */

$(document).ready(function(){

    var _local_subscribe_topics = JSON.parse( window.localStorage.getItem( common.getLocalSubscribeTopicTag() ) );

    var remove_with_id_from_sql = function( _db, _topic_id ) {
        var _sql = "DELETE FROM " + common.getLocalSubscribeTopicTag() + " WHERE id='" + _topic_id + "'";
        _db.executeSql( _sql , [], function( res ) {
            console.log("Succeeded removing " + res.rowsAffected + " row with id " + _topic_id);
        });
        _db.close(function() {
            console.log('database is closed ok');
        });
    }

    var add_to_sql = function( _db, _topic_id, _topic_name ) {
        var _sql = "INSERT INTO " + common.getLocalSubscribeTopicTag() + " (id, name) VALUES (?,?)";
        _db.executeSql( _sql , [ _topic_id, _topic_name ], function( res ) {
            console.log("Succeeded adding " + res.rowsAffected + " row with id " + _topic_id);
        });
        _db.close(function() {
            console.log('database is closed ok');
        });
    }

    var remove_subscribe_item = function() {
        var _topic_id = $(this).siblings('span.subscribe_item_id').text();

        remove_with_id_from_sql( common.getDatabaseHandler(), _topic_id );

        var _array = JSON.parse( window.localStorage.getItem( common.getLocalSubscribeTopicTag() ) );
        var _new_array = new Array();
        for ( var j = 0; j < _array.length; ++j ) {
            if ( _array[j].id != _topic_id ) {
                _new_array.push( _array[j] );
            }
        }
        window.localStorage.setItem( common.getLocalSubscribeTopicTag(), JSON.stringify( _new_array ) );
        $(this).parent().remove();
    };

    var add_subscribe_item = function() {
        var _id = $(this).children('span.subscribe_item_id').text();
        var _name = $(this).children('span').last().text();
        var _obj = new Object();
        _obj.id = _id;
        _obj.name = _name;
        var _array = JSON.parse( window.localStorage.getItem( common.getLocalSubscribeTopicTag() ) );
        _array.push( _obj );
        window.localStorage.setItem( common.getLocalSubscribeTopicTag(), JSON.stringify( _array ) );

        add_to_sql( common.getDatabaseHandler(), _id, _name );

        var _new_topic = $("<div class='subscribe_item'>" +
            "<span class='subscribe_item_id'>" + _id + "</span>" +
            "<span class='subscribe_item_title'>" + _name + "</span>" +
            "<image src='img/subscribe/delete.png' alt='img/subscribe/delete.png'></image>" +
            "</div>");
        _new_topic.appendTo( $( 'div#current_subscribe' ) );
        _new_topic.children('img').click( remove_subscribe_item );

        $(this).remove();
    }

    for ( var i = 0; i < _local_subscribe_topics.length; ++i ) {
        var _topic = _local_subscribe_topics[i];
        var _new_topic = $("<div class='subscribe_item'>" +
                "<span class='subscribe_item_id'>" + _topic.id + "</span>" +
                "<span class='subscribe_item_title'>" + _topic.name + "</span>" +
                "<image src='img/subscribe/delete.png' alt='img/subscribe/delete.png'></image>" +
            "</div>");
        _new_topic.appendTo( $( 'div#current_subscribe' ) );

        _new_topic.children('img').click( remove_subscribe_item );
    }

    $('div#exit').click(function(){
        window.history.go(-1);
    });
    
    $('button#subscribe_edit').click(function(){
        $(this).addClass('hide');
        $('button#subscribe_edit_done').removeClass('hide');
        $('div#current_subscribe').children('div.subscribe_item').each(function(){
            $(this).children('img').css({'display':'block'});
        });
    });

    $('button#subscribe_edit_done').click(function(){
        $(this).addClass('hide');
        $('button#subscribe_edit').removeClass('hide');
        $('div#current_subscribe').children('div.subscribe_item').each(function(){
            $(this).children('img').css({'display':'none'});
        });
    });

    var process_subscribe_query = function( _d ) {

        $("div#search_results").empty();

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            for ( var j = 0; j< _data.length; ++j ) {
                var _item = _data[j];
                var _id = _item.id;
                var _title = _item.title;

                var _new_result = $("<div class='result'>" +
                    "    <span class='subscribe_item_id' style='display:none'>" + _id + "</span>" +
                    "    <span>" + _title + "</span>" +
                    "</div>");
                _new_result.appendTo( $("div#search_results") );
                _new_result.click( add_subscribe_item );
            }
        }
    }

    $('div#search_bar').children('button').click(function(){
        var _key_word = $('div#input_field').children('input').val();
        server_communication.subscribe_query( _key_word, process_subscribe_query );
        $('div#search_results').css({'display':'block'});
    });

    var process_subscribe_recommendation = function( _d ) {
        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            for ( var i =0 ;i < _data.length; ++i ) {
                var _item = _data[i];
                var _id = _item.id;
                var _title = _item.title;

                var _new_item = $("<div class='subscribe_item'>" +
                    "    <span class='subscribe_item_id'>" + _id + "</span>" +
                    "    <span class='subscribe_item_title'>" + _title + "</span>" +
                    "</div>");
                _new_item.appendTo( $('div#subscribe_recommendation') );

                _new_item.click( add_subscribe_item );
            }
        }
    }

    var _rec_data = new Object();
    _rec_data.count = 5;
    _rec_data.exceptions = new Array();
    var _array = JSON.parse( window.localStorage.getItem( common.getLocalSubscribeTopicTag() ) );
    for ( var j = 0; j < _array.length; ++j ) {
        _rec_data.exceptions.push( _array[j].id );
    }

    server_communication.subscribe_recommendation( _rec_data, process_subscribe_recommendation );
});
