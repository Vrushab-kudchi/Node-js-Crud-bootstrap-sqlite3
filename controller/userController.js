const userController = {
    getUser: (req, res) => {
        res.render('index')
    },
    add: (req, res) => {
        res.render('user/add')
    }
}



module.exports = userController;
