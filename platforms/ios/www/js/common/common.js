/**
 * Created by gxlzlihao on 16/6/18.
 */

var hoursAgo = function( dateStr ) {
    var _target_date = new Date(Date.parse(dateStr.replace(/-/g,   "/")));
    var _sec_res = Date.now().getTime() / 1000 - _target_date.getTime() / 1000;
    return _sec_res / 3600;
}