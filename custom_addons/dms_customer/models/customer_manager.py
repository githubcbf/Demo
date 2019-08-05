from odoo import fields, models


class Customer(models.Model):
    _name = 'customer.info'
    _description = 'customer'
    _order = 'name, desc'

    # 必要信息字段信息
    Customer_Id = fields.Integer(String='车主编号')
    Name = fields.Char(String='姓名', required=True)
    Car_Nature = fields.Char(String='车主性质')
    Tel = fields.Float(String='手机号')
    Contact_Name = fields.Char(String='联系人姓名', required=True)
    Contact_Phone = fields.Char(String='联系人电话')
    Create_People = fields.Char(String='创建人')
    Id_Type = fields.Char(String='证件类型')
    Id_Num = fields.Float(String='证件号码')

    # 附加信息字段信息
    Industry_Categories = fields.Char(String='行业大类')
    Industry_Small = fields.Char(String='行业小类')
    Email = fields.Char(String='电子邮箱')
    Birthday = fields.Datetime(String='生日')
    Member_Level = fields.Char(String='会员级别')
    Book_Type = fields.Selection(
        [('level1', '级别1'),
         ('level2', '级别2'), ],
        'Type')
    Registration_Date = fields.Char(String='会员注册日期')
    Monthly_Income = fields.Integer(String='家庭月收入')
    Marital_status = fields.Selection(
        [('1', '未婚'),
         ('2', '已婚未育'),
         ('3', '已婚已育'),
         ('4', '已育'), ],
        'Type')
    Hobbies = fields.Selection(
        [('1', '户外活动'),
         ('2', '上网'),
         ('3', '室内健身'),
         ('4', '聚会'),
         ('5', '购物'),
         ('6', '看报纸'),
         ('7', '听音乐'),
         ('8', '听收音机'),
         ('9', '看电视')],
        'Type'
        )
    Is_Member = fields.Boolean()

    # 联系人信息
    Contact_name = fields.Char(String='行业大类')





