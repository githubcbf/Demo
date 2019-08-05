odoo.define('sco_base.SCOFormTreeView', function (require) {
    "use strict";
    // var BasicView = require('web.BasicView');
    // var BasicModel = require('web.BasicModel');
    // var core = require('web.core');
    // var config = require('web.config');
    var FormView = require('web.FormView');
    // var FormController = require('web.FormController');
    // var FormRenderer = require('web.FormRenderer');
    // var view_registry = require('web.view_registry');

    // var QWeb = core.qweb;

    /*var SCOFormTreeRenderer = FormRenderer.extend({
        events: _.extend({}, FormRenderer.prototype.events, {
            'click .tab': '_onSettingTabClick',
            'keyup .searchInput': '_onKeyUpSearch',
        }),

        init: function () {
            console.log('render init')
            this._super.apply(this, arguments);
            this.activeView = false;
            this.activeTab = false;
            this.currentID = false;
            this.treeValues = [];
        },
        /!*start: function () {
            this._super.apply(this, arguments);
            const self = this;
        },
        _render: function () {
            var res = this._super.apply(this, arguments);
            this._renderTabs();
            return res;
        },
        _renderTabs: function () {
            var tabs = $(QWeb.render('SCOFormTreeView'));
            if ($(this.$el.parent().find('#ztree_view')).length > 0) {
                return;
            }

            tabs.prependTo($(this.$el.parent()));
            this.buildTreeView();
        },

        buildTreeView:function(){
            const self = this;
            var setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parent_id",
                        rootPId: false
                    }
                },
                callback: {
                    onClick: function (event, id, treeNode) {
                        self._selectNode(event, treeNode);
                    }
                }
            };
            self._search().then(function (result) {
                console.log(result);
                // $.fn.zTree.init($('#ztree_view'), setting, result);
            })
        },

        _search: function () {
            var self = this;
            var def = $.Deferred();
            this._rpc({
                model: this.state.model,
                method: "search_read",
                domain: [['name','!=',false]],
                context: this.state.context,
            })
                .then(function (result) {
                    console.log(result);
                    //数据格式化
                    var values = _.map(result, function (x) {
                        x['open'] = true;
                        x['parent_id'] = x.parent_id[0];
                        return x;
                    });
                    def.resolve(values);
                });

            return def;
        },

        _selectNode:function (event,data) {
            let hash = window.location.hash;
            if (hash && hash.indexOf('#') !== -1) {
                hash = hash.replace('#','');
            }
            const params = hash.split('&');
            for (let i=0;i<params.length;i++) {
                const param = params[i].split('=')[0];
                if (param === 'id') {
                    params[i] = 'id='+data.id;
                }
            }
            window.location.hash = '#'+params.join('&');
        },*!/
    });

    var SCOFormTreeController = FormController.extend({
        init: function () {
            this._super.apply(this, arguments);
            this.disableAutofocus = true;
            this.renderer.activeSettingTab = this.initialState.context.module;
        },
        /!**
         * Settings view should always be in edit mode, so we have to override
         * default behaviour
         *
         * @override
         *!/
        willRestore: function () {
            this.mode = 'edit';
        },
    });*/

    /*var SCOFormTreeModel = BasicModel.extend({
        /!**
         * @override
         *!/
        save: function (recordID) {
            var self = this;
            return this._super.apply(this, arguments).then(function (result) {
                // we remove here the res_id, because the record should still be
                // considered new.  We want the web client to always perform a
                // default_get to fetch the settings anew.
                delete self.localData[recordID].res_id;
                return result;
            });
        },
    });*/

    FormView.include({
        // jsLibs: [],

        /*config: _.extend({}, FormView.prototype.config, {
            Model: SCOFormTreeModel,
            Renderer: SCOFormTreeRenderer,
            Controller: SCOFormTreeController,
        }),*/

        /**
         * Overrides to lazy-load touchSwipe library in mobile.
         *
         * @override
         */
        init: function (viewInfo, params) {
            console.log('view init');
            this._super.apply(this, arguments);
        },
    });

    // view_registry.add('sco_tree_view', SCOFormTreeView);

    /* return {
         SCOFormTreeView
     };*/

});