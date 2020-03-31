const fs = require('fs');
//const fileUpload = require('express-fileupload');

module.exports = {
//Render index page
  getIndex: (req, res) => {
    let posts = [];

  	db.query('SELECT * FROM mainpage', function(err, rows, fields) {
  	  	if (err) {
  	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
  	  	} else {

  	  		for (let i = 0; i < rows.length; i++) {

            console.log(rows[i].title);

  		  		var entree = {
  		  			"title": rows[i].title,
  		  			"text": rows[i].text,
  		  			"date":rows[i].date
  		  		}

  		  		posts.push(entree);
  	  	}

  	  	res.render('index.pug', {posts: posts, errorMessage: "Site is UP!"});
  	  	}
  	});


  },
//Render database page
  getDb: (req, res) => {
    let posts = [];

    db.query('SELECT * FROM dbpage', function(err, rows, fields) {
        if (err) {
          res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {

          for (let i = 0; i < rows.length; i++) {


            var entree = {
              'title':rows[i].title,
              'text':rows[i].text,
              'date':rows[i].date
            }

            posts.push(entree);
        }

        res.render('dbinfo.pug', {posts: posts, errorMessage: "Site is UP!"});
        }
    });

  },
//Render insert page
  getInsert: (req, res) => {
    let posts = [];

    db.query('SELECT * FROM insertpage', function(err, rows, fields) {
        if (err) {
          res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {

          for (let i = 0; i < rows.length; i++) {


            var entree = {
              'title':rows[i].title,
              'text':rows[i].text,
              'date':rows[i].date
            }

            posts.push(entree);
        }

        res.render('insert.pug', {posts: posts, errorMessage: "Site is UP!"});
        }
    });

  },
//Render system oage
  getSys: (req, res) => {

    let posts = [];

    db.query('SELECT * FROM syspage', function(err, rows, fields) {
        if (err) {
          res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {

          for (let i = 0; i < rows.length; i++) {


            var entree = {
              'title':rows[i].title,
              'text':rows[i].text,
              'date':rows[i].date
            }

            posts.push(entree);
        }

        res.render('sys.pug', {posts: posts, errorMessage: "Site is UP!"});
      }
  });


  },
//Render post page
  getLogin: (req, res) => {
    res.render('login.pug');

  },

//Send a new post to db
  postNewPost: (req, res) => {

    console.log('Connecting to database for posting');

    let d = new Date();
    let year = d.getYear();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();

    let date = ""+ day +"/"+ month + " - " + year + "  " + hour + ":" + min + "";

    let category = req.body.cat;
    let title = req.body.title;
    let text = req.body.txt;



    if ( category == "Framsidan") {
    let query = "INSERT INTO mainpage (`title`, `text`, `date`) VALUES ('" +
          title + "', '" + text + "', '" + date + "')";
    db.query(query, (err, result) => {
        if (err) {
            console.log('An error occured');
            return res.status(500).send(err);
        } else {
        res.redirect('/');
        console.log('New item added to database!');
        }
      });
      }


    if ( category == "Databaser") {
      let query = "INSERT INTO dbpage (`title`, `text`, `date`) VALUES ('" +
            title + "', '" + text + "', '" + date + "')";
      db.query(query, (err, result) => {
          if (err) {
              console.log('An error occured');
              return res.status(500).send(err);
          }else {
          res.redirect('/');
          console.log('New item added to database!');
          }
        });
      }

    if ( category == "Inlägg") {
      let query = "INSERT INTO insertpage (`title`, `text`, `date`) VALUES ('" +
            title + "', '" + text + "', '" + date + "')";
      db.query(query, (err, result) => {
          if (err) {
              console.log('An error occured');
              return res.status(500).send(err);
          }else {
          res.redirect('/');
          console.log('New item added to database!');
          }
        });

      }

    if ( category == "Systemet") {
      let query = "INSERT INTO syspage (`title`, `text`, `date`) VALUES ('" +
            title + "', '" + text + "', '" + date + "')";
      db.query(query, (err, result) => {
          if (err) {
              console.log('An error occured');
              return res.status(500).send(err);
          } else {
          res.redirect('/');
          console.log('New item added to database!');
          }
        });

      }

      else {
        res.redirect("/");
      }

    },

  };
