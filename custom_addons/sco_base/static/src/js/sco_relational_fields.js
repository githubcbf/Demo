odoo.define('sco_base.relational_fields', function (require) {
    'use strict';
    var field_registry = require('web.field_registry');
    var core = require('web.core');
    var AbstractField = require('web.AbstractField');
    const RelationalFields = require('web.relational_fields');
    const Dialog = require("web.Dialog");


    var _t = core._t;

    RelationalFields.FieldOne2Many.include({

        dms_condition_operate: function () {
            try {
                let options = this.attrs.options;
                if (options) {
                    if (options.dms_amount_constraints || options.dms_list_select_constraints) {
                        return options;
                    }
                }
            } catch (e) {
                return null;
            }
            return null;
        },
        _onSaveLine: function (ev) {
            var self = this;
            ev.stopPropagation();
            this.renderer.commitChanges(ev.data.recordID).then(function () {
                self.trigger_up('mutexify', {
                    action: function () {
                        return self._saveLine(ev.data.recordID)
                            .done(ev.data.onSuccess)
                            .fail(ev.data.onFailure);
                    },
                });
            });
        },
        _saveLine: function (recordID) {
            var self = this;
            var def = $.Deferred();
            var fieldNames = this.renderer.canBeSaved(recordID);
            // let dmsConditionOperate = this.dms_condition_operate();
            // 是否计算数据失败
            let isCustomOperateFail = false;
            // if (dmsConditionOperate != null) {
            //     console.log('FieldOne2Many == _saveLine == this  ', this);
            //     console.log('FieldOne2Many == _saveLine == recordID  ', recordID);
            //     let dmsAmountConstraints = dmsConditionOperate.dms_amount_constraints;
            //     try {
            //         //处理 金额 约束
            //         if (dmsAmountConstraints) {
            //             const totalValue = dmsAmountConstraints.total_value;
            //             const childValue = dmsAmountConstraints.child_value;
            //             // 父级总金额的字段名
            //             const parentTotalFieldKey = totalValue.key;
            //             //one2many 字段名
            //             const o2mFieldFieldKey = childValue.from_field;
            //             //子级 需要计算的字段名
            //             const childCountFieldKey = childValue.key;
            //             if (this.model === totalValue.from_model) {
            //                 // 总金额
            //                 const totalAmount = this.recordData[parentTotalFieldKey];
            //                 // 子级数组
            //                 const items = this.recordData[o2mFieldFieldKey].data;
            //                 let currentOperateItem = null;
            //                 let usedAmount = 0;
            //
            //                 items.foreach(item => {
            //                     if (item.id === recordID) {
            //                         currentOperateItem = item;
            //                     } else {
            //                         usedAmount += item.data[childCountFieldKey];
            //                     }
            //                 });
            //                 //可分配金额
            //                 let availableAmount = totalAmount - usedAmount;
            //                 if (currentOperateItem != null) {
            //                     if (currentOperateItem[childCountFieldKey] > availableAmount) {
            //                         //弹框警告
            //                         this.cusDialogOpen({
            //                             title: _t('Warning'),
            //                             content: $('<div>').html(_t('<p>' +
            //                                 '  Current client receive amount must be not greater then the total amount ! ' +
            //                                 '<p/>')),
            //                             buttons: [
            //                                 {text: _t('Confirm !'), close: true}
            //                             ]
            //                         });
            //                         isCustomOperateFail = true;
            //                     }
            //                 }
            //             }
            //         }
            //     } catch (e) {
            //         console.log(e);
            //         isCustomOperateFail = false;
            //     }
            // }

            if (isCustomOperateFail) {
                // 计算失败 回滚数据
                this.trigger_up('discard_changes', {
                    recordID: recordID,
                    onSuccess: def.resolve.bind(def),
                    onFailure: def.reject.bind(def),
                });
            } else {
                //计算成功  正常操作
                if (fieldNames.length) {
                    this.trigger_up('discard_changes', {
                        recordID: recordID,
                        onSuccess: def.resolve.bind(def),
                        onFailure: def.reject.bind(def),
                    });
                } else {
                    this.renderer.setRowMode(recordID, 'readonly').done(def.resolve.bind(def));
                }
            }

            return def.then(function () {
                self.pager.updateState({size: self.value.count});
                var newEval = self._evalColumnInvisibleFields();
                if (!_.isEqual(self.currentColInvisibleFields, newEval)) {
                    self.currentColInvisibleFields = newEval;
                    self.renderer.updateState(self.value, {
                        columnInvisibleFields: self.currentColInvisibleFields,
                    });
                }
            });
        },
        /**
         * 一般弹框
         * @param btnConfig  弹框参数
         */
        cusDialogOpen: function (btnConfig) {

            var defaultTitle = "Tip";
            var defaultSize = "medium";
            var defaultContent = $('<div>').html(_t('<p>welcome<p/>'));
            var defaultButtons = [
                {text: _t('Cancel'), close: true}
            ];

            if (btnConfig) {
                if (btnConfig.title)
                    defaultTitle = btnConfig.title;
                if (btnConfig.size)
                    defaultSize = btnConfig.size;
                if (btnConfig.content)
                    defaultContent = btnConfig.content;
                if (btnConfig.buttons)
                    defaultButtons = btnConfig.buttons;
            }

            new Dialog(this, {
                title: _t(defaultTitle),
                size: defaultSize,
                $content: defaultContent,
                buttons: defaultButtons
            }).open();
        }
    });
    // 横排  check box
    var SCOFieldMany2ManyCheckBoxes = AbstractField.extend({
        template: 'SCOFieldMany2ManyCheckBoxes',
        events: _.extend({}, AbstractField.prototype.events, {
            change: '_onChange',
        }),
        specialData: "_fetchSpecialRelation",
        supportedFieldTypes: ['many2many'],
        init: function () {
            this._super.apply(this, arguments);
            this.m2mValues = this.record.specialData[this.name];
        },

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        isSet: function () {
            return true;
        },

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

        /**
         * @private
         */
        _render: function () {
            var self = this;
            this._super.apply(this, arguments);
            _.each(this.value.res_ids, function (id) {
                self.$('input[data-record-id="' + id + '"]').prop('checked', true);
            });
        },
        /**
         * @private
         */
        _renderReadonly: function () {
            this.$("input").prop("disabled", true);
        },

        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
         * @private
         */
        _onChange: function () {
            var ids = _.map(this.$('input:checked'), function (input) {
                return $(input).data("record-id");
            });
            this._setValue({
                operation: 'REPLACE_WITH',
                ids: ids,
            });
        },
    });

    field_registry.add('sco_many2many_checkboxes', SCOFieldMany2ManyCheckBoxes);

    return {
        SCOFieldMany2ManyCheckBoxes
    };

});