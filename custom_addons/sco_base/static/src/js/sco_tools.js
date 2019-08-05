odoo.define('sco_base.SCOImportButton', function (require) {
    "use strict";

    var AbstractView = require('web.AbstractView');

    var Tools = AbstractView.include({
        init: function (viewInfo, params) {
            this._super(viewInfo, params);
            var self = this;
            /*
            import: 是否隐藏导入  按钮
            例:
                <tree
                    create="false"
                    delete="false"
                    import="false"
                    duplicate="false"
                    edit="false"
                >
         */
            try {
                var importation = self.arch.attrs.import ? JSON.parse(self.arch.attrs.import) : true;
                params.import_enabled = importation;
                // self.controllerParams.activeActions['import'] = importation;
            } catch (e) {
                console.log('ERROR Tools import btn params ', e);
            }
            // this._super(viewInfo, params);
        },
    });

    return Tools;

});

odoo.define('sco_base.SCOCusBasicModel', function (require) {
    "use strict";
    var Domain = require('web.Domain');
    var BasicModel = require('web.BasicModel');

    var Tools = BasicModel.include({
        _evalModifiers: function (element, modifiers) {
            var result = {};
            var self = this;
            var evalContext;

            function evalModifier(mod) {
                if (mod === undefined || mod === false || mod === true) {
                    return !!mod;
                }
                evalContext = evalContext || self._getEvalContext(element);
                return new Domain(mod, evalContext).compute(evalContext);
            }

            if ('invisible' in modifiers) {
                result.invisible = evalModifier(modifiers.invisible);
            }
            if ('column_invisible' in modifiers) {
                result.column_invisible = evalModifier(modifiers.column_invisible);
            }
            if ('readonly' in modifiers) {
                result.readonly = evalModifier(modifiers.readonly);
            }
            if ('required' in modifiers) {
                result.required = evalModifier(modifiers.required);
            }
            if ('sco_form_edit_create_hide' in modifiers) {
                result.sco_form_edit_create_hide = evalModifier(modifiers.sco_form_edit_create_hide);
            }
            if ('sco_form_edit_hide' in modifiers) {
                result.sco_form_edit_hide = evalModifier(modifiers.sco_form_edit_hide);
            }
            if ('sco_form_create_hide' in modifiers) {
                result.sco_form_create_hide = evalModifier(modifiers.sco_form_create_hide);
            }
            return result;
        },
    });

    return Tools;

});