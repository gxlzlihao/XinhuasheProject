/**
 * Created by gxlzlihao on 16/4/27.
 */
$(document).ready(function(){

    var prepare_history_database = function( _db ) {
        _db.executeSql('CREATE TABLE IF NOT EXISTS ' + common.getSearchHistoryTag() + ' ( id integer primary key, name string, count integer ) ');
        _db.executeSql('SELECT name, count FROM ' + common.getSearchHistoryTag() , [], function( res ) {
            if ( res.rows.length == 0 ) {
                console.log( "No past history" );
                window.localStorage.setItem( common.getSearchHistoryTag(), new Array() );
            } else {
                var _history = new Array();
                for ( var j = 0; j < res.rows.length; ++j ) {
                    var _n = new Object();
                    _n.name = res.rows.item(j);
                    _n.count = res.rows.item(j);
                    _history.push( _n );

                    console.log( "Succeed received one history item with name: " + _n.name + " and count: " + _n.count );
                }
                window.localStorage.setItem( common.getSearchHistoryTag(), _history );
            }
        });
        _db.close(function() {
            console.log('database is closed ok');
        });
    }

    var update_history_record = function( _db, _name, _count ) {
        var _sql = "UPDATE " + common.getSearchHistoryTag() + " h SET h.count=" + _count + " WHERE h.name=" + _name;
        _db.executeSql( _sql, [], function( res ) {
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function( error ) {
            console.log('UPDATE error: ' + error.message);
        });
        _db.close(function() {
            console.log('database is closed ok');
        });
    }

    var insert_history_record = function( _db, _name, _count ) {
        var _sql = "INSERT INTO " + common.getSearchHistoryTag() + " (name, count) VALUES (?,?)";
        _db.executeSql( _sql, [ _name, _count ], function( res ) {
                console.log("rowsAffected: " + res.rowsAffected);
            },
            function( error ) {
                console.log('INSERT error: ' + error.message);
            });
        _db.close(function() {
            console.log('database is closed ok');
        });
    }

    prepare_history_database( common.getDatabaseHandler() );

    var sort_search_history = function( _a, _b ) {
        return _a.count > _b.count;
    }

    var add_search_key_word = function( _key_word ) {
        var _history = window.localStorage.getItem( common.getSearchHistoryTag() );
        var _already_existed = false;
        for ( var i = 0; i < _history.length; ++i ) {
            if ( _history[i].name == _key_word ) {
                _already_existed = true;
                _history[i].count = _history[i].count + 1;

                update_history_record( common.getDatabaseHandler(), _history[i].name, _history[i].count );
            }
        }
        if ( _already_existed == false ) {
            var _n = new Object();
            _n.name = _key_word;
            _n.count = 1;
            _history.push( _n );

            insert_history_record( common.getDatabaseHandler(), _key_word, 1 );
        }
        _history = _history.sort( sort_search_history );
        window.localStorage.setItem( common.getSearchHistoryTag(), _history );
    }

    var search_hint_press = function() {
        var _key_word = $(this).text();
        $('div.input_field').children('input').val( _key_word );

        add_search_key_word( _key_word );

        console.log("Go to the search result page");
        window.location.href = window.location.href.replace( 'search.html', 'search_results.html?key_word=' + _key_word );
    }

    var _history = window.localStorage.getItem( common.getSearchHistoryTag() );
    for ( var k = 0; k < _history.length; ++k ) {
        var _name = _history[k].name;
        var _n = $("<span>" + _name + "</span>");
        _n.appendTo( $('div.history') );
        _n.click( search_hint_press );
    }

    $('button#search_submit').click(function(){
        var _key_word = $('div.input_field').children('input').val();
        add_search_key_word( _key_word );

        console.log("Go to the search result page");
        window.location.href = window.location.href.replace( 'search.html', 'search_results.html?key_word=' + _key_word );
    });

    $('img#top_back_button').click(function(){
        window.history.go(-1);
    });

    var clear_section = function( _node ) {
        _node.children('span').each(function(){
            if ( !$(this).is('.section_title') ) {
                $(this).remove();
            }
        });
    }

    var process_search_recommendation = function( _d ) {
        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            clear_section( $('div.hot_searches') );
            for ( var i = 0; i < _data.length; ++i ) {
                var _n = $("<span>" + _data[i].title + "</span>");
                _n.appendTo( $('div.hot_searches') );
                _n.click( search_hint_press );
            }
        }
    }

    server_communication.search_recommendation( 5, process_search_recommendation );

    var process_search_hints = function( _d ) {

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
        } else {
            $('div.hot_searches').css({'display':'none'});
            $('div.history').css({'display':'none'});
            $('div.children_search').css({'display':'block'});
            $('div.related_people').css({'display':'block'});

            clear_section( $('div.children_search') );
            clear_section( $('div.related_people') );

            var _people = _data.Related_people;
            var _children = _data.Children_searches;
            for ( var i = 0; i < _people.length; ++i ) {
                var _n = $("<span>" + _people[i].title + "</span>");
                _n.appendTo( $('div.related_people') );
                _n.click( search_hint_press );
            }
            for ( var j = 0; j < _children.length; ++j ) {
                var _n = $("<span>" + _children[i].title + "</span>");
                _n.appendTo( $('div.children_search') );
                _n.click( search_hint_press );
            }
        }

    }

    $('div.input_field').children('input').keyup(function(){
        var _key_word = $(this).val();
        server_communication.search_hints( _key_word, process_search_hints );
    });

});
