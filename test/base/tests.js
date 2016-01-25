
/*global tableselect:true, utils:true, QUnit:true*/


QUnit.test('constructor element test', function(assert) {
    var table = document.querySelector('#qunit-fixture table');
    var ts = new tableselect.TableSelect(table);

    var rows = table.querySelectorAll('tr');
    utils.clickRow(rows[0]);
    assert.ok(rows[0].classList.contains('selected'),
              'first row is selected');
});


QUnit.test('constructor selector test', function(assert) {
    var ts = new tableselect.TableSelect('#qunit-fixture table');
    var rows = document.querySelectorAll('#qunit-fixture table tr');
    utils.clickRow(rows[0]);
    assert.ok(rows[0].classList.contains('selected'),
              'first row is selected');
});
