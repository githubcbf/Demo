odoo.define('sco_base.SCOFormTree_1', function (require) {
    "use strict";
    const FormView = require('web.FormView');

    FormView.include({

        //form 初始化
        init: function (viewInfo, params) {
            console.log("TAG ------- SCOFormTree_1 this ", this);
            this._super.apply(this, arguments);
        }

    });
});