from odoo import fields, models
from odoo.tools.translate import _

INSTITUTION_CATEGORY = [
    (1, _('OEM')),
    (2, _('Bank')),
    (3, _('Third Party'))
]

LENDING_PATTERNS = [
    (1, _('Buy a car by credit card')),
    (2, _('Bank car loan')),
    (3, _('Auto finance corporation auto loan')),
    (4, _('bonding company')),
]
# 字典类别相关


# 车主类别
class CustomerType(models.Model):
    _name = 'dms.dict.customer.type'
    _description = 'Customer Type'
    _order = 'sequence'

    name = fields.Char(string='Customer Type', size=128, trim=True, required=True, translate=True)
    active = fields.Boolean(string='Active', default=True)
    sequence = fields.Integer(string='Sort', default=1)


# 折扣类型
class DiscountType(models.Model):
    _name = 'dms.dict.discount.type'
    _description = 'Discount Type'
    _order = 'sequence'

    name = fields.Char(string='Discount Type', size=128, trim=True, required=True, translate=True)
    active = fields.Boolean(string='Active', default=True)
    sequence = fields.Integer(string='Sort', default=1)


# 折扣部门
class DiscountDepartment(models.Model):
    _name = 'dms.dict.discount.department'
    _description = 'Discount Department'
    _order = 'sequence'

    name = fields.Char(string='Discount Department', size=128, trim=True, required=True, translate=True)
    active = fields.Boolean(string='Active', default=True)
    sequence = fields.Integer(string='Sort', default=1)


# 赔付保险公司
class CompensateInsurance(models.Model):
    _name = 'dms.dict.compensate.insurance'
    _description = 'Compensate Insurance'
    _order = 'sequence'

    _sql_constraints = [
        (_('Insurance'), 'unique(code)',
         _('Insurance Code Cannot Be Added Repeatedly'))
    ]
    code = fields.Char(string='Code', trim=True, required=True)

    name = fields.Char(string='Compensate Insurance', size=128, trim=True, required=True, translate=True)
    active = fields.Boolean(string='Active', default=True)
    sequence = fields.Integer(string='Sort', default=1)


# 工单类型
class OrderType(models.Model):
    _name = 'dms.dict.order.type'
    _description = 'Order Type'
    _order = 'sequence'

    _sql_constraints = [
        (_('Order Type'), 'unique(code)',
         _('Order Type Cannot Be Added Repeatedly'))
    ]
    code = fields.Char(string='Order Code', trim=True, required=True)

    name = fields.Char(string='Order Type', size=128, trim=True, required=True, translate=True)
    active = fields.Boolean(string='Active', default=True)
    sequence = fields.Integer(string='Sort', default=1)


# 单位
class DmspartsUnit(models.Model):
    _name = 'dms.dict.unit'
    _description = 'Unit'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Unit', translate=True)

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 税率
class DmsTaxRate(models.Model):
    _name = 'dms.dict.tax.rate'
    _description = 'Tax Rate'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Tax Rate', translate=True)

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 工种
class DmsWorkType(models.Model):
    _name = 'dms.dict.work.type'
    _description = 'Work Type'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Work Type', translate=True)

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 工时单价
class DmsWorkingHoursPrice(models.Model):
    _name = 'dms.dict.work.hours.price'
    _description = 'Working Hours Price'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Time Price Unit', translate=True)

    value = fields.Float(required=True, string='Time Price Unit')

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 调整价四舍五入精度
class DmsPrecision(models.Model):
    _name = 'dms.dict.precision'
    _description = 'Price Precision'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Price Precision', translate=True)

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 收款类别
class DmsChargeCategory(models.Model):
    _name = 'dms.dict.charge.category'
    _description = 'Charge Category'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Charge Category', translate=True)

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 结算币种
class DmsCurrency(models.Model):
    _name = 'dms.dict.currency'
    _description = 'Currency'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, size=128, string='Currency', translate=True)

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


# 收款方式
class CollectionMethod(models.Model):
    _name = 'dms.dict.collection.method'
    _description = 'Collection Method'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, translate=True)

    sequence = fields.Integer(default=10)

    is_active = fields.Boolean(default=True)


# 发票类型
class InvoiceType(models.Model):
    _name = 'dms.dict.invoice.type'
    _description = 'Invoice Type'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, translate=True)

    sequence = fields.Integer(default=10)

    is_active = fields.Boolean(default=True)


# 金融机构
class FinancialInstitution(models.Model):
    _name = 'dms.dict.financial.institution'
    _description = 'Financial Institution'
    _order = 'id'
    # 金融机构名称
    name = fields.Char(required=True, trim=True, translate=True, size=128, string='Financial Institution Name')
    # 金融机构简称
    abbreviation = fields.Char(required=True, string='Financial Institution Abbreviation')
    # 机构类型
    institution_category = fields.Selection(INSTITUTION_CATEGORY, string='Institution Category', required=True)
    # 贷款方式
    loan_way = fields.Selection(LENDING_PATTERNS, string='Loan Way', required=True)
    # 金融机构代码
    codename = fields.Char(string='Financial Institution Codename')
    # 是否可用
    is_active = fields.Boolean(default=True, string='Active')


# 仓库种类
class DmspartsWarehouse(models.Model):
    _name = 'dms.warehouse.kind'
    _description = 'Kind of Warehouse'
    _order = 'sequence'

    name = fields.Char(required=True, trim=True, string='Name')

    sequence = fields.Integer(default=10, string='Sort')

    is_active = fields.Boolean(default=True, string='Active')


class DmsWarehouse(models.Model):
    _name = 'dms.warehouse.main'
    _description = 'warehouse base information'
    _order = 'id'

    # 仓库类别
    warehouse = fields.Many2one('dms.warehouse.kind', string='Warehouse Category')
    # 仓库名称
    name = fields.Char(required=True, string='Warehouse Name')
    # 仓库代码
    warehouse_code = fields.Char(string='Warehouse Codename')
    # 库位代码
    warehouse_location = fields.Char(string='Warehouse Location')
