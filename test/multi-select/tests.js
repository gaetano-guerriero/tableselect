
/*global tableselect:true, utils:true, QUnit:true*/


QUnit.test('ctrl select test', function(assert) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table, {multiple: true});
    var rows = table.querySelectorAll('tr');

    utils.clickRow(rows[6]);
    assert.ok(rows[6].classList.contains('selected'), 'row is selected');
    for (var c = 0; c < 6; c++)
        assert.notOk(rows[c].classList.contains('selected'),
                     'other rows are not selected');
    assert.deepEqual(ts.getSelection(), ["6"]);

    utils.clickRow(rows[1], true);
    assert.ok(rows[1].classList.contains('selected'), 'row is selected');
    var sel = ts.getSelection();
    sel.sort();
    assert.deepEqual(sel, ["1", "6"]);
    assert.notOk(rows[2].classList.contains('selected'), 'row not selected');
});


QUnit.test('ctrl deselect test', function(assert) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table, {multiple: true});
    var rows = table.querySelectorAll('tr');

    utils.clickRow(rows[6]);
    assert.ok(rows[6].classList.contains('selected'), 'row is selected');
    utils.clickRow(rows[6], true);
    assert.ok(! rows[6].classList.contains('selected'), 'row is not selected');
    assert.deepEqual(ts.getSelection(), []);
});


QUnit.test('shift select test', function(assert) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table, {multiple: true});
    var rows = table.querySelectorAll('tr');

    utils.clickRow(rows[1]);
    utils.clickRow(rows[3], false, true);

    for (var c = 1; c < 4; c++)
        assert.ok(rows[c].classList.contains('selected'),
                  'row is selected');

    var sel = ts.getSelection();
    sel.sort();
    assert.deepEqual(sel, ['1', '2', '3']);
});


QUnit.test('shift+ctrl test', function(assert) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table, {multiple: true});
    var rows = table.querySelectorAll('tr');

    utils.clickRow(rows[1]);
    utils.clickRow(rows[2], false, true);

    utils.clickRow(rows[4], true);

    assert.deepEqual(ts.getSelection().sort(), ['1', '2', '4']);

    utils.clickRow(rows[6], true, true);
    assert.deepEqual(ts.getSelection().sort(), [
        '1', '2', '4', '5', '6']);
});
