//setting Up DataBase To Upload Data
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./master.db');


// using multer here to get value
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        console.log(file)
        const filename = file.originalname.replace(extension, '') + '-' + Date.now() + extension;
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });


const userController = {
    getUser: (req, res) => {
        db.all(`SELECT * FROM users`, [], (err, row) => {
            if (err) return console.error(err.message);
            res.render('index', { user: row })
        })
    },
    add: (req, res) => {
        res.render('user/add')
    },
    addUser: (req, res) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.log(err);
                res.send('Error uploading file');
            } else {
                const img = req.file.filename
                const { full_name, age, email } = req.body;
                db.run(`INSERT INTO users(full_name,age,email,image) VALUES(?,?,?,?)`, [full_name, age, email, img], (err) => {
                    if (err) return console.error(err.message);
                    console.log("data Added")
                    res.redirect('/')
                })

            }
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
            if (err) return console.error(err.message);
            console.log('Deleted')
            res.redirect("/");
        })
    },
    editUser: (req, res) => {
        const id = req.params.id;
        db.all(`SELECT * FROM users WHERE id = ?`, [id], (err, rows) => {
            if (err) return console.error(err.message);
            res.render('user/edit', { user: rows });
        })
    },
    editedUser: (req, res) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.log(err);
                res.send('Error uploading file');
            } else {
                const img = req.file.filename
                const id = req.params.id
                const { full_name, age, email } = req.body;
                db.run(`UPDATE users SET full_name=? , age=? , email=? ,image=? WHERE id= ?`, [full_name, age, email, img, id], (err) => {
                    if (err) return console.error(err.message);
                    console.log("data Updated")
                    res.redirect('/')
                })

            }
        })
    }, showUser: (req, res) => {
        const id = req.params.id;
        db.all(`SELECT * FROM users WHERE id = ?`, [id], (err, rows) => {
            if (err) return console.error(err.message);
            res.render('user/show', { user: rows });
        })
    }
}


module.exports = userController;
