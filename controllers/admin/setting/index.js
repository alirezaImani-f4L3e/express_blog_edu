const settingModel = require('@models/setting')

const configs = {
    websiteTitle: 'test',
    websiteDescreption: 'test',
    posts_count_per_page: 10,
    register_state: 1,
    view_state: 1
}


exports.index = async(req, res) => {
    const settings = await settingModel.findAll();
    const presentedSetting = {};
    settings.map(element => {
        presentedSetting[element.setting_name] = element.setting_value;
    });
    res.adminRender('admin/settings/index', {
        layout: 'admin',
        config: presentedSetting,
        helpers: {
            isCkecked: function(status, options) {
                return status == 1 ? options.fn(this) : options.inverse(this)
            }
        }
    })
}

exports.store = async(req, res) => {
    const settings = req.body;
    const settingsForDB = {}
    Object.keys(settings).forEach(item => {

        if (settings[item] === 'on') settingsForDB[item] = 1
        else settingsForDB[item] = settings[item]
    })
    Object.keys(configs).forEach(item => {
        if (!Object.keys(settings).includes(item)) {
            settingsForDB[item] = 0
        };
    })

    const result = await settingModel.update(settingsForDB)
    res.redirect('/admin/settings')

}