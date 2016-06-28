/**
 * Created by gxlzlihao on 16/5/5.
 */
mapChart = null;
mapOption = null;

lineChart = null;
lineOption = null;

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

            if ( mapChart != null ) {
                mapChart.hideLoading();
                mapOption = {
                    tooltip: {
                        trigger: 'item'
                    },
                    dataRange: {
                        min: _map.min,
                        max: _map.max,
                        x: 'left',
                        y: 'bottom',
                        text: ['高', '低'],           // 文本，默认为数值文本
                        calculable: true
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: 'influenceMap',
                            type: 'map',
                            mapType: 'china',
                            itemStyle: {
                                normal: {label: {show: true}},
                                emphasis: {label: {show: true}}
                            },
                            data: _map.data
                        }
                    ]
                };
                mapChart.setOption( mapOption );
                window.onresize = mapChart.resize;  //自适应屏幕大小
            }

            if ( lineChart != null ) {
                var _x_data = new Array();
                var _y_data = new Array();
                for ( var w = 0; w < _trend.data.length; ++w ) {
                    _x_data.push( _trend.data[w].time );
                    _y_data.push( _trend.data[w].value );
                }

                lineChart.hideLoading();
                lineOption = {
                    legend: {                                   // 图例配置
                        padding: 5,                             // 图例内边距，单位px，默认上下左右内边距为5
                        itemGap: 10,                            // Legend各个item之间的间隔，横向布局时为水平间隔，纵向布局时为纵向间隔
                        data: ['influenceTrend']
                    },
                    tooltip: {                                  // 气泡提示配置
                        trigger: 'item',                        // 触发类型，默认数据触发，可选为：'axis'
                    },
                    xAxis: [                                    // 直角坐标系中横轴数组
                        {
                            type: 'category',                   // 坐标轴类型，横轴默认为类目轴，数值轴则参考yAxis说明
                            data: _x_data
                        }
                    ],
                    yAxis: [                                    // 直角坐标系中纵轴数组
                        {
                            type: 'value',                      // 坐标轴类型，纵轴默认为数值轴，类目轴则参考xAxis说明
                            boundaryGap: [0.1, 0.1],            // 坐标轴两端空白策略，数组内数值代表百分比
                            splitNumber: 4                      // 数值轴用，分割段数，默认为5
                        }
                    ],
                    series: [
                        {
                            name: 'influenceTrend',                        // 系列名称
                            type: 'line',                       // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
                            data: _y_data
                        }
                    ]
                };
                lineChart.setOption( lineOption );
            }

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

