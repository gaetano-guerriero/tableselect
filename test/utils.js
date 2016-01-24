

var utils = function() {

    function clickRow(tr) {
        var event;
        try {
            event = new MouseEvent('click', {
                button: 0,
                bubbles: true
            });
        }
        catch(e) { // for phantomjs
            event = document.createEvent('MouseEvent');
            event.initMouseEvent(
                'click', true, true,
                window, null,
                0, 0, 0, 0, /* coordinates */
                false, false, false, false, /* modifier keys */
                0 /*left*/, null
            );
        }
        tr.dispatchEvent(event);
    }

    return {
        clickRow: clickRow
    };
}();
