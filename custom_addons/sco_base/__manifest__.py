{
    'name': 'SCO Base',
    'description': 'SCO Customized Web And So On',
    'author': 'WH,WL',
    'depends': ['base', 'web', 'web_settings_dashboard'],
    'application': True,
    'category': 'DMS',
    'data': [
        'views/assets.xml',
        'views/login_template.xml',
        'views/main_template.xml',
    ],
    'qweb': [
        'static/src/xml/base.xml',
        'static/src/xml/user_menu.xml',
        'static/src/xml/setting_dashboard.xml',
        'static/src/xml/navbar.xml',
        'static/src/xml/ztree_view.xml',
    ],
    'demo': [
    ],
}
