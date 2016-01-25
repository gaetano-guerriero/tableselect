/*
 * Tableselect v0.1
 *
 * Copyright 2016 Gaetano Guerriero
 * Released under the MIT license
 */

var tableselect = (function() {

    /*
     table: tabella html
     config:
      - selectedClass: css class of selected rows (default 'selected')
      - idDatasetAttr: dataset attribute containing row id, else row number
        is used, and multipage support disabled
      - onChange: selection change callback, called with selection size
     */
    function TableSelect(table, config) {
        if (typeof table == 'string')
            this._table = document.querySelector(table);
        else
            this._table = table;
        // object config
        this._cfg = this._initCfg(config);
        // number of selected rows
        this._nSelected = 0;
        // selected rows by id
        this._selected = Object.create(null);
        // neede for shift selection
        this._shiftPivot = null;

        this._registerClicks();
    }

    TableSelect.prototype = {

        /* get list of row (by id) current selected */
        getSelection: function() {
            return Object.keys(this._selected);
        },
        /* tell object that table is changed
         table is re-readed and current selection is voided */
        reset: function() {
            this._nSelected = 0;
            this._selected = Object.create(null);
            var trs = this._getTrs();
            for (var c = 0; c < trs.length; c++)
                trs[c].classList.remove(this._cfg.selectedClass);
        },
        /* change page
         table is scanned and id who where selected are displayed as selected
         */
        pageChange: function() {
            if (! this._cfg.idDatasetAttr)
                throw new Error(
                    'can\'t use multipage if idDatasetAttr is not set');
            this._rescanTable();
        },
        /* select every row of table in current page */
        selectAll: function() {
            var trs = this._getTrs();
            for (var c = 0; c < trs.length; c++)
                this._selectRow(trs[c], c);
            if (this._cfg.onChange)
                this._cfg.onChange(this._nSelected);
        },
        /* deselect row in current page */
        deselectAll: function() {
            var trs = this._getTrs();
            for (var c = 0; c < trs.length; c++)
                this._deselectRow(trs[c], c);
            if (this._cfg.onChange)
                this._cfg.onChange(this._nSelected);
        },
        /* set selected rows by id */
        setSelection: function(selectedIds) {
            for (var c = 0; c < selectedIds.length; c++) {
                this._selected[selectedIds[c]] = null;
            }
            this._nSelected = 0;
            for (var id in this._selected)
                this._nSelected++;
            this._rescanTable();
            if (this._cfg.onChange)
                this._cfg.onChange(this._nSelected);
        },
        // init config with default values
        _initCfg: function(config) {
            config = config || Object.create(null);

            var defaultCfg = Object.create(null);
            defaultCfg.selectedClass = 'selected';
            defaultCfg.multiple = false;
            defaultCfg.additive = false;
            defaultCfg.idDatasetAttr = 'tableselectId';

            for (var prop in defaultCfg)
                if (! (prop in config))
                    config[prop] = defaultCfg[prop];
            return config;
        },
        // return <tr> of table
        _getTrs: function() {
            return this._table.querySelectorAll('tbody > tr');
        },
        // rescan table applying existing selections
        _rescanTable: function() {
            var trs = this._getTrs();
            for (var c = 0; c < trs.length; c++) {
                var trId = this._getTrId(trs[c], c);
                if (trId in this._selected)
                    trs[c].classList.add(this._cfg.selectedClass);
                else
                    trs[c].classList.remove(this._cfg.selectedClass);
            }
        },
        // register click handler on table body
        _registerClicks: function() {
            var self = this;
            //var trs = this._getTrs();
            var tbody = this._table.querySelector('tbody');
            tbody.addEventListener('click', function(ev) {
                // find tr containing event source
                var el = ev.target;
                while (el.nodeName != 'TR' && el.nodeName != 'TBODY')
                    el = el.parentElement;
                if (el.nodeName != 'TR')
                    return;
                var index = [].indexOf.call(tbody.children, el);
                self._onRowClick(el, index, ev.ctrlKey, ev.shiftKey);
            });
        },
        // select a row
        _selectRow: function(tr, index) {
            var trId = this._getTrId(tr, index);
            tr.classList.add(this._cfg.selectedClass);
            if (! (trId in this._selected)) {
                this._selected[trId] = null;
                this._nSelected++;
            }
        },
        // deselect a row
        _deselectRow: function(tr, index) {
            var trId = this._getTrId(tr, index);
            tr.classList.remove(this._cfg.selectedClass);
            if (trId in this._selected) {
                delete this._selected[trId];
                this._nSelected--;
            }
        },
        _onRowClick: function(tr, index, ctrl, shift) {
            var trId = this._getTrId(tr, index);
            var wasSelected = trId in this._selected;
            if (this._cfg.multiple) {
                if (this._cfg.additive)
                    ctrl = true;

                if (! this._shiftPivot)
                    shift = false;

                if (shift) {
                    if (! ctrl)
                        this.deselectAll();
                    this._selectRowInterval(this._shiftPivot, index);
                }
                else if (ctrl) {
                    if (wasSelected)
                        this._deselectRow(tr, index);
                    else
                        this._selectRow(tr, index);
                    this._shiftPivot = index;
                }
                else {
                    if (! wasSelected)
                        this.deselectAll();
                    this._selectRow(tr, index);
                    this._shiftPivot = index;
                }
            }
            else {
                if (ctrl && wasSelected)
                    this._deselectRow(tr, index);
                else {
                    this.deselectAll();
                    this._selectRow(tr, index);
                }
            }

            if (this._cfg.onChange)
                this._cfg.onChange(this._nSelected);
        },
        _selectRowInterval: function(from, to) {
            if (from > to) {
                var temp = to;
                to = from;
                from = temp;
            }
            var trs = this._getTrs();
            for (var c = from; c <= to; c++)
                this._selectRow(trs[c], c);
        },
        _getTrId: function(tr, index) {
            // avoid using .dataset for browser compatibility
            var attrName = 'data-' + this._cfg.idDatasetAttr;
            if (tr.hasAttribute(attrName))
                return tr.attributes[attrName].value;
            return index;
        }
    };

    return {
        TableSelect: TableSelect
    };
})();
