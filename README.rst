tableselect
***********

*Javascript table selection*


*tableselect* is a small tool to manage row selection inside html tables.

Its main objectives are zero external dependecy and multi-page support.


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
    <table>
        <tr><td>row</td><td>0</td></tr>
        <tr><td>row</td><td>1</td></tr>
        <tr><td>row</td><td>2</td></tr>
    </table>

    <script>
        var table = document.querySelector('.table');
        new tableselect.TableSelect(table);
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

    new tableselect.TableSelect(table, {
        multiple: true, additive: true
    });
