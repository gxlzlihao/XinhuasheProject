/**
 * Created by gxlzlihao on 16/5/5.
 */

$(document).ready(function(){

    var _topic_id = common.getUrlParam( "topic_id" );

    var sortOpinions = function( _a, _b ) {
        return _a.percentage < _b.percentage;
    }

    var sortPeople = function( _a, _b ) {
        return _a.number < _b.number;
    }

    var sortEvents = function( _a, _b ) {
        var date1 = Date.parse( _a.time );
        var date2 = Date.parse( _b.time );
        return date1 < date2;
    }

    var adjustPeopleSection = function() {

        var total_number = 0;

        $('div.section#related_people div.content').children('div.item').each(function(){
            var _v = $(this).children('div.number_area').children('span').text();
            total_number = total_number + parseInt( _v );
        });

        $('div.section#related_people div.content').children('div.item').each(function(){
            var _v = $(this).children('div.number_area').children('span').text();
            $(this).children('div.number_area').children('div').css({ 'width': ( parseInt(_v) / total_number * 100 ) + "%" });
        });

    }

    var adjustOpinionSection = function() {

        $('div.section#opinions').children('div.content').children('div.item').each(function(){
            var percentage_value = $(this).children('div.percentage_area').children('span').text();
            $(this).children('div.percentage_area').children('div').css({ 'width':percentage_value });
        });

    }

    var process_discussion_room_data = function( _d ) {

        var _result = $.parseJSON( _d )[0].result;
        var _data = $.parseJSON( _d )[0].data;
        if ( _result == false || _result == null ) {
            alert( "Failed to get data from the remote server!" );
            window.history.go( -1 );
        } else {
            var _map = _data.map;
            var _trend = _data.trend;
            var _events = _data.Events.sort(sortEvents);
            var _opinions = _data.opinions.sort(sortOpinions);
            var _analysis = _data.analysis;
            var _people = _data.people.sort(sortPeople);

            for ( var q = 0; q < _events.length ; ++q ) {
                var _ev = _events[q];
                var _n = $("<div class='item'>" +
                    "<span class='time_stamp'>" + _ev.time.split(' ')[0] + "</span>" +
                    "<span class='title'>" + _ev.title + "</span></div>");
                _n.appendTo( $('div#timeline').children('div.content') );
            }

            for ( var i = 0; i < _opinions.length; ++i ) {
                var _opinion = _opinions[i];
                var _n = $("<div class='item'>" +
                    "<span class='opinion_title'>" + _opinion.title + "</span>" +
                    "<div class='percentage_area'>" +
                    "<span>" + Math.round( _opinion.percentage ) + "%</span>" +
                    "<div></div></div></div>");
                _n.appendTo( $('div#opinions').children('div.content') );
            }

            adjustOpinionSection();

            for ( var j = 0; j < _people.length; ++j ) {
                var _person = _people[j];
                var _n = $("<div class='item'>" +
                    "<span class='person_name'>" + _person.name + "</span>" +
                    "<div class='number_area'>" +
                    "<span>" + _person.number + "</span>" +
                    "<div></div></div></div>");
                _n.appendTo( $('div#related_people').children('div.content') );
            }

            adjustPeopleSection();

            for ( var k = 0; k < _analysis.length; ++k ) {
                var _a = _analysis[k];
                var _n = "<div class='item'>" +
                    "<span class='item_title'>" + _a.title + "</span>" +
                    "<p>" + _a.text + "</p>" +
                    "<div class='item_info'><div class='reliability'>";

                if ( _a.reliability == 1 ) {
                    _n = _n +
                        "<image src='img/discussion_room/credit_green.png' alt='img/discussion_room/credit_green.png'></image>" +
                        "<span>信</span>";
                } else if ( _a.reliability == -1 ) {
                    _n = _n +
                        "<image src='img/discussion_room/credit_red.png' alt='img/discussion_room/credit_red.png'></image>" +
                        "<span>谣</span>";
                } else if ( _a.reliability == 0 ) {
                    _n = _n +
                        "<image src='img/discussion_room/credit_orange.png' alt='img/discussion_room/credit_orange.png'></image>" +
                        "<span>疑</span>";
                }
                _n = _n + "</div><span class='item_source'>" + _a.source + "</span></div></div>";
                _n = $( _n );
                _n.appendTo( $('div#analysis').children('div.content') );
            }
        }

    }

    server_communication.discussion_room( _topic_id, process_discussion_room_data );

    $('img#top_back_button').click(function(){
        console.log("lihao");
        window.history.go(-1);
    });

});

