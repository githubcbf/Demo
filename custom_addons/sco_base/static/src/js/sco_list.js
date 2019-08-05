odoo.define('sco_base.ListView', function (require) {
    'use strict';
    const ListRenderer = require('web.ListRenderer');
    const ListView = require('web.ListView');
    ListView.include({
        init: function (viewInfo, params) {
            this._super.apply(this, arguments);
            try {
                /*
                show_selectors: 是否显示顶部动作（Action）
                例:
                   <act_window id="sco_project_need_postpone_action"
                            name="Delay Audit"
                            res_model="project.task"
                            view_mode="tree,form"
                            view_id="sco_project_need_postpone_tree_view"
                            domain="[('postpone_need_audit_id','!=',False)]"
                            context="{'show_selectors':'false'}"
                    />
                 */
                let show_selectors = params.context.show_selectors;
                if (show_selectors) {
                    this.rendererParams.hasSelectors = JSON.parse(show_selectors);
                }
            } catch (e) {
                console.log('ERROR Tools import show_selectors  ', e);
            }
        }
    });
    /*ListRenderer.include({
        _renderEmptyRow: function () {
            const ele = (new Array(this._getNumberOfCols())).fill('<td>&nbsp;</td>')
            return $('<tr>').append(ele.join(''));
        }
    })*/
});