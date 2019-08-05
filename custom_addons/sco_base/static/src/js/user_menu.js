odoo.define('sco.UserMenu', function (require) {
    "use strict";
    let core = require('web.core');
    let framework = require('web.framework');
    let Dialog = require('web.Dialog');
    let Widget = require('web.Widget');
    let UserMenu = require('web.UserMenu');

    let _t = core._t;
    let QWeb = core.qweb;

    //添加 测试菜单
    UserMenu.include({
        _onMenuTest: function () {
            new Dialog(this, {
                size: 'large',
                dialogClass: 'o_act_window',
                title: _t("Keyboard Test"),
                $content: $(QWeb.render("UserMenu.test"))
            }).open();
        },
    });

});