/**
 * Created by gxlzlihao on 16/6/18.
 */
var common = {
    hoursAgo : function (dateStr) {
        var _target_date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        var _sec_res = Date.now() / 1000 - _target_date.getTime() / 1000;
        return Math.floor(_sec_res / 3600);
    },

    daysAgo : function (dateStr) {
        var _target_date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        var _sec_res = Date.now() / 1000 - _target_date.getTime() / 1000;
        return Math.floor(_sec_res / ( 3600 * 24 ));
    },

    monthsAgo : function (dateStr) {
        var _target_date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        var _sec_res = Date.now() / 1000 - _target_date.getTime() / 1000;
        return Math.floor(_sec_res / ( 3600 * 24 * 30 ));
    },

    timeAgo : function (dateStr) {
        var _hours_ago = common.hoursAgo(dateStr);
        var _days_ago = common.daysAgo(dateStr);
        var _months_ago = common.monthsAgo(dateStr);
        if (_hours_ago > 24) {
            if (_days_ago > 30) {
                _res = _months_ago + "月";
            } else {
                _res = _days_ago + "天";
            }
        } else {
            _res = _hours_ago + "小时";
        }
        return _res;
    },

    getUrlParam : function (_name) {
        var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },

    getDatabaseHandler: function() {
        var _db_name = "xinhuashe.db";
        return window.sqlitePlugin.openDatabase({name: _db_name, location: 'default'} ,function( _db ){
            console.log( "Succeeded opening the database " + _db_name );
        }, function( _error ){
            console.log( "Failed to open the database with error: " + JSON.stringify( _error ) );
        });
    },

    getDefaultSubscribeTopicIds: function() {
        return ['6','7','8','9','10'];
    },

    getDefaultSubscribeTopicNames: function() {
        return ['财经','国际','时政','体育','文化'];
    },

    getLocalSubscribeTopicTag : function () {
        return "local_subscribe_topics";
    },

    getSearchHistoryTag : function () {
        return "search_history";
    }
}
