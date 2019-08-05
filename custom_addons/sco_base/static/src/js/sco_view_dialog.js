odoo.define('sco_project.CusViewDialog', function (require) {
    "use strict";
    var ViewDialogs = require('web.view_dialogs');

    var core = require('web.core');

    var ListController = require('web.ListController');
    var ListView = require('web.ListView');
    var SearchView = require('web.SearchView');

    var _t = core._t;


    var SelectCreateListController = ListController.extend({
        // Override the ListView to handle the custom events 'open_record' (triggered when clicking on a
        // row of the list) such that it triggers up 'select_record' with its res_id.
        custom_events: _.extend({}, ListController.prototype.custom_events, {
            open_record: function (event) {
                var selectedRecord = this.model.get(event.data.id);
                this.trigger_up('select_record', {
                    id: selectedRecord.res_id,
                    display_name: selectedRecord.data.display_name,
                });
            },
        }),
    });

    ViewDialogs.SelectCreateDialog.include({
        //override
        setup: function (search_defaults, fields_views) {

            /*
            sco_modal_no_search: 是否隐藏 SearchView
            例:
                 <field name="transfer_object" widget="many2many"
                           context="{
                           'tree_view_ref':'sco_settings.sco_view_project_deliverable2',
                           'sco_modal_no_search':'true'
                           }"
                           options="{'no_create': True}"
                    >
         */
            var isShowSearchView = true;
            try {
                let scoModalNoSearch = this.context.sco_modal_no_search;
                let isHideSearchView = JSON.parse(scoModalNoSearch);
                isShowSearchView = !isHideSearchView;
            } catch (e) {
                console.log('Error SelectCreateDialog init  this', e);
            }


            var self = this;
            var fragment = document.createDocumentFragment();

            var searchDef = $.Deferred();

            // Set the dialog's header and its search view
            var $header = $('<div/>').addClass('o_modal_header').appendTo(fragment);
            var $pager = $('<div/>').addClass('o_pager').appendTo($header);
            var options = {
                $buttons: $('<div/>').addClass('o_search_options').appendTo($header),
                search_defaults: search_defaults,
            };
            var searchview = new SearchView(this, this.dataset, fields_views.search, options);
            searchview.prependTo($header).done(function () {
                var d = searchview.build_search_data();
                if (self.initial_ids) {
                    d.domains.push([["id", "in", self.initial_ids]]);
                    self.initial_ids = undefined;
                }
                var searchData = self._process_search_data(d.domains, d.contexts, d.groupbys);
                searchDef.resolve(searchData);
            });

            return $.when(searchDef).then(function (searchResult) {
                // Set the list view
                var listView = new ListView(fields_views.list, _.extend({
                    context: searchResult.context,
                    domain: searchResult.domain,
                    groupBy: searchResult.groupBy,
                    modelName: self.dataset.model,
                    hasSelectors: !self.options.disable_multiple_selection,
                    readonly: true,
                }, self.options.list_view_options));
                listView.setController(SelectCreateListController);
                return listView.getController(self);
            }).then(function (controller) {
                self.list_controller = controller;
                // Set the dialog's buttons
                self.__buttons = [{
                    text: _t("Cancel"),
                    classes: "btn-secondary o_form_button_cancel",
                    close: true,
                }];
                if (!self.options.no_create) {
                    self.__buttons.unshift({
                        text: _t("Create"),
                        classes: "btn-primary",
                        click: self.create_edit_record.bind(self)
                    });
                }
                if (!self.options.disable_multiple_selection) {
                    self.__buttons.unshift({
                        text: _t("Select"),
                        classes: "btn-primary o_select_button",
                        disabled: true,
                        close: true,
                        click: function () {
                            var records = self.list_controller.getSelectedRecords();
                            var values = _.map(records, function (record) {
                                return {
                                    id: record.res_id,
                                    display_name: record.data.display_name,
                                };
                            });
                            self.on_selected(values);
                        },
                    });
                }
                return self.list_controller.appendTo(fragment);
            }).then(function () {
                searchview.toggle_visibility(isShowSearchView);
                self.list_controller.do_show();
                self.list_controller.renderPager($pager);
                return fragment;
            });
        },
    });


});
