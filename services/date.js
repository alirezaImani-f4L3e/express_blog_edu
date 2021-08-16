const jm = require('jalali-moment')

exports.toJalali = (date, format = 'YYYY/MM/DD') => {

    return jm(date).locale('fa').format(format)
}