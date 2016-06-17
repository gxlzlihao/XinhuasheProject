/**
 * Created by gxlzlihao on 16/5/18.
 */

var viewport_adjust = function(){

    var _screent_width = screen.width;
    var _initial_scale = 0.575;
    var _maximum_scale = 0.575;
    var _minimum_scale = 0.575;
    var _viewport_template = "user-scalable=no, initial-scale={_initial_scale}, maximum-scale={_maximum_scale}, minimum-scale={_minimum_scale}, width=device-width";
    if ( _screent_width == 375 ) {
        console.log( "adjust viewport meta for the iPhone 6" );
        _initial_scale = 0.521;
        _maximum_scale = 0.521;
        _minimum_scale = 0.521;
    } else {
        console.log( "adjust viewport meta for the iPhone 6s plus or iPhone 6s, by default" );
    }

    var _viewport = _viewport_template.replace('{_initial_scale}', _initial_scale);
    _viewport = _viewport.replace('{_maximum_scale}', _maximum_scale);
    _viewport = _viewport.replace('{_minimum_scale}', _minimum_scale);

    document.getElementsByName("viewport")[0].content = _viewport;

};

viewport_adjust();
