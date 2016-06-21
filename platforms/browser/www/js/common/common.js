/**
 * Created by gxlzlihao on 16/6/18.
 */

var hoursAgo = function( dateStr ) {
    var _target_date = new Date(Date.parse(dateStr.replace(/-/g,   "/")));
    var _sec_res = Date.now() / 1000 - _target_date.getTime() / 1000;
    return Math.floor( _sec_res / 3600 );
}

var daysAgo = function( dateStr ) {
    var _target_date = new Date(Date.parse(dateStr.replace(/-/g,   "/")));
    var _sec_res = Date.now() / 1000 - _target_date.getTime() / 1000;
    return Math.floor( _sec_res / ( 3600 * 24 )  );
}

var monthsAgo = function( dateStr ) {
    var _target_date = new Date(Date.parse(dateStr.replace(/-/g,   "/")));
    var _sec_res = Date.now() / 1000 - _target_date.getTime() / 1000;
    return Math.floor( _sec_res / ( 3600 * 24 * 30 )  );
}

var timeAgo = function( dateStr ) {
    var _hours_ago = hoursAgo( dateStr );
    var _days_ago = daysAgo( dateStr );
    var _months_ago = monthsAgo( dateStr );
    if ( _hours_ago > 24 ) {
        if ( _days_ago > 30 ) {
            _res = _months_ago + "月";
        } else {
            _res = _days_ago + "天";
        }
    } else {
        _res = _hours_ago + "小时";
    }
    return _res;
}

var getUrlParam = function( _name ) {
    var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}