

var utils = function() {

    function clickRow(tr, ctrl, shift) {
        var event;
        var init = {
            button: 0, bubbles: true,
            ctrlKey: ctrl, shiftKey: shift
        };

        try {
            event = new MouseEvent('click', init);
        }
        catch(e) { // for phantomjs
            event = document.createEvent('MouseEvent');
            event.initMouseEvent(
                'click', true, true,
                window, null,
                0, 0, 0, 0, /* coordinates */
                init.ctrlKey, false, init.shiftKey, false, /* modifier keys */
                0 /*left*/, null
            );
        }
        tr.dispatchEvent(event);
    }

    return {
        clickRow: clickRow
    };
}();
