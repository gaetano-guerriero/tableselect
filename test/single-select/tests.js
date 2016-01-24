
/*global tableselect:true, utils:true, QUnit:true*/


QUnit.test('select test', function(assert) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table);

    var rows = table.querySelectorAll('tr');
    utils.clickRow(rows[0]);

    assert.ok(rows[0].classList.contains('selected'),
              'first row is selected');
    for (var c = 1; c < rows.length; c++)
        assert.notOk(rows[c].classList.contains('selected'),
                     'other rows are not selected');
    assert.deepEqual(ts.getSelection(), ["0"]);
});


QUnit.test('change select test', function( assert ) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table);

    var rows = table.querySelectorAll('tr');

    utils.clickRow(rows[1]);
    assert.ok(rows[1].classList.contains('selected'),
              'clicked row is selected');
    assert.deepEqual(ts.getSelection(), ["1"]);
    utils.clickRow(rows[2]);
    assert.ok(! rows[1].classList.contains('selected'),
              'previously selected is deselected');
    assert.ok(rows[2].classList.contains('selected'),
              'clicked row is selected');
    assert.deepEqual(ts.getSelection(), ["2"]);
});
