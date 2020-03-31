const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'matsalen'
});


const routes = require('./routes/scripts.js')

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//Middleware setup
app.use(express.urlencoded())
app.use('/', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(errorhandler());

//Login code
const session = require('express-session');


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/newPost', function(req, res) {
	if (req.session.loggedin) {
		res.render('newPost.pug');
	} else {
		res.redirect('/');
	}
	res.end();
});

app.get('/stats', function(req, res) {
	if (req.session.loggedin) {
		res.render('stats.pug');
	} else {
		res.redirect('/');
	}
	res.end();
});

//

//Hämta Index-sidan
app.get('/', (req, res) => {routes.getIndex(req,res)});

app.get("/dbinfo", (req,res) => { routes.getDb(req,res)});
app.get("/insertinfo", (req,res) => { routes.getInsert(req,res)});
app.get("/sysinfo", (req,res) => { routes.getSys(req,res)});
app.get("/login", (req,res) => { routes.getLogin(req,res)});

app.post("/newPost", (req,res) => { routes.postNewPost(req,res) });


//Sätt views som default-mapp för rendering
app.use(express.static(__dirname + '/views'));


//Lyssna på localhost:3000
app.listen(3000);

console.log('Running at Port 3000');
