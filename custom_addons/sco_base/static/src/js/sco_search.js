odoo.define('sco_base.SearchView', function (require) {
    'use strict'
    const ControlPanel = require('web.ControlPanel');
    ControlPanel.include({
        events: {
            'keyup .sco_search_input': '_sco_do_search',
        },
        _update_search_view: function (searchview, isHidden, groupable, enableTimeRangeMenu) {
            if (searchview) {
                const searchFields = searchview.search_fields;
                let eles = []
                searchFields.forEach(item => {
                    const ele = "<div class='sco_search_item'>" +
                        "<label>" + item.attrs.string + "</label>" +
                        "<input field_type='" + item.attrs.type + "' name='" + item.attrs.name + "' class='sco_search_input'/>" +
                        "</div>"

                    eles.push(ele)

                })
                $(searchview.$el.parent()).html(eles.join(''))
                // searchview.toggle_visibility(!isHidden);
                if (groupable !== undefined) {
                    searchview.groupby_menu.do_toggle(groupable);
                }
                if (enableTimeRangeMenu !== undefined) {
                    searchview.displayTimeRangeMenu(enableTimeRangeMenu);
                }
            }
            this.nodes.$searchview.toggle(!isHidden);
            this.$el.toggleClass('o_breadcrumb_full', !!isHidden);
        },
        _sco_do_search: function (e) {
            if (e.which !== $.ui.keyCode.ENTER) {
                return
            }
            var search = this.sco_build_search_data();
            this.trigger_up('search', search);
        },
        sco_build_search_data: function (noDomainEvaluation) {
            var domains = [], contexts = [], groupbys = [];
            const eles = $('.o_cp_searchview').children();
            eles.each(function () {
                const input = $(this).children('input');
                const fieldType = input.attr('field_type');
                switch (fieldType) {
                    case 'char':
                        domains.push([[input.attr('name'), 'ilike', input.val()]]);
                        break;
                    case 'number':
                        domains.push([[input.attr('name'), '=', input.val()]]);
                        break;
                    default:
                        break;
                }

            })
            var intervalMappingNormalized = {};
            _.each(this.intervalMapping, function (couple) {
                var fieldName = couple.groupby.fieldName;
                var interval = couple.interval;
                intervalMappingNormalized[fieldName] = interval;
            });
            return {
                domains: domains,
                contexts: contexts,
                groupbys: groupbys,
                intervalMapping: intervalMappingNormalized,
            };
        },
    })
})