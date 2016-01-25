tableselect
***********

*Javascript table selection*


*tableselect* is a small tool to manage row selection inside html tables.

Its main objectives are zero external dependecies and multi-page support.


Basic usage
###########

.. code-block:: html

    <head>
        <script src="path/to/tableselect.js"></script>
        <style>
            tr.selected {
                background-color: green;
            }
        </style>
    </head>

    <body>
    <table id="#mytable">
        <tr><td>row</td><td>0</td></tr>
        <tr><td>row</td><td>1</td></tr>
        <tr><td>row</td><td>2</td></tr>
    </table>

    <script>
        new tableselect.TableSelect('#mytable');
    </script>



Multi selection
###############

To permit multiselection, simply use ``multiple`` option:

.. code-block:: javascript

    new tableselect.TableSelect(table, {
        multiple: true
    });


To enable additive multiselection, instead of classic ctrl & shift
multiselection, specify also ``additive``:

.. code-block:: javascript

    new tableselect.TableSelect('#mytable', {
        multiple: true, additive: true
    });


Row identifiers
###############

tableselect.js use the concept of `row identifier`.
For each row the identifier is read in an attribute of the ``<tr`` element (
by default ``data-datableselect-id``).
When the attribute is absent, the index of the row is used instead.
Obviously, in order to use multi-page support meaningfully, you must set the
attribute.
The identifier is also used by ``getSelection`` and ``setSelection`` methods


Multi page support
##################

tableselect.js can keep track of your selection while you browse the pages of
the table.
To enable multi-page support, insert an attribute in your DOM to recognize rows:

.. code-block:: html

    <table>
        <tr data-tableselect-id="0"><td>row</td><td>0</td></tr>
        <tr data-tableselect-id="1"><td>row</td><td>1</td></tr>
        <tr data-tableselect-id="2"><td>row</td><td>2</td></tr>
    </table>

    <script>
        var ts = new tableselect.TableSelect('table);
    </script>

Now suppose the user goes to page 2 and you change accordingly your table with
your favourite templating/dom-manipulation library:

.. code-block:: html

    <table>
        <tr data-tableselect-id="3"><td>row</td><td>3</td></tr>
        <tr data-tableselect-id="4"><td>row</td><td>4</td></tr>
        <tr data-tableselect-id="5"><td>row</td><td>5</td></tr>
    </table>


You must inform TableSelect object of each page change:

.. code-block:: javascript

   ts.pageChange();

When the user come back to first page, the selection will be preserved.


API
###

.. code-block:: javascript

    tableselect.TableSelect(tableElement, [config])

Instantiate a new TableSelect object. The selection management is immediately
active.

 * **tableElement**: an html element, or a css selector as string
 * **config**: optional, an object that can have the following properties

   - *selectedClass*: css class applied to the selected rows. Default
     ``'selected'``.
   - *multiple*: if true enable multiple selection. Default ``false``.
   - *additive*: if true enable multiple selection even on click without ctrl
     pressed. Default ``false``.
   - *idDatasetAttr*: data attribute on <tr> elements containing row id. Default
     ``tableselectId`` (can be writtern in DOM as ``data-tableselect-id``). If
     attribute is missing the id of each row is his index.
   - *onChange*: a function to be called each time the selection changes, with
     the number of selected rows as arguments.



.. code-block:: javascript

   ts.getSelection()

Returns an array with the identifiers of the selected rows.


.. code-block:: javascript

   ts.selectAll()

Select every row of the table in current page


.. code-block:: javascript

   ts.deselectAll()

De-select every row of the table in current page


.. code-block:: javascript

   ts.pageChange()

Inform the object that the table page is changed.
Old rows are kept selected in memory, and new rows are displayed selected if they
was so.


.. code-block:: javascript

   ts.reset()

Inform the object that table is changed.
HTML table is re-readed and current selection is voided.
Can be also used to deselect the rows in every page.


.. code-block:: javascript

   ts.setSelection(selectedIds)

Manually select some rows.

 * **selectedIds**: array of row indentifiers to select
