const express = require('express');
const authorsRouter = express.Router();
// const authors = require('../data/authors');
const authordata = require('../model/AuthorModel');

//accepting nav to render navbar in ejs file ((part#2 point6))
function router(nav) {
    //router to render authors page
    authorsRouter.get('/', function (req, res) {

        authordata.find()
            .then(function (authors) {

                res.render('authors', {
                    nav,
                    authors
                });

            })
    })



    //router to render add author page
    authorsRouter.get('/addauthor', function (req, res) {
        res.render('addauthor', { nav });

    });




    //router to add author
    authorsRouter.post('/add', function (req, res) {

        var item = {
            title: req.body.title,
            //req.body.images changes to req.body.image as name parameter is set to image ((part#2 point8))
            image: req.body.image,
            about: req.body.about
        }
        console.log(item);
        const author = new authordata(item);
        author.save();
        res.redirect('/authors');

    })




    //router for single author
    authorsRouter.get('/:id', function (req, res) {

        const id = req.params.id;
        authordata.findOne({ _id: id })
            .then(function (author) {
                console.log(author);
                res.render('author', {
                    nav,
                    author
                })

            })

    });




    //router to delete author
    /* authorsRouter.post('/delete', function (req, res) {
    
        const id = req.body.id;  
        console.log(id);
    
        authordata.findOneAndDelete({ _id: id })
            .then(function () {
    
                res.redirect('/authors')
    
            })  
    }) */

    authorsRouter.post('/delete', function (req, res) {
        const id = req.body.id;
        //((part#2 point9))
        authordata.findOneAndDelete({ _id: id }, { useFindAndModify: false }, function (err, newAuthor) {
            if (err) {
                console.log('Error in adding author' + err);
            } else {
                console.log(newAuthor + '  deleted')
                res.redirect('/authors')
            }
        })

    })




    //router to edit author
    authorsRouter.post('/edit', function (req, res) {


        authordata.findOne({ _id: req.body.id }, function (err, data) {
            if (err) {
                throw err;
            }
            else {
                res.render('editauthor', { nav, data })
            }
        })
    })



    //router to update author
    authorsRouter.post('/update', function (req, res) {
        console.log(req.body);
        var img;
        if (req.body.imgfile == '') {
            img = req.body.image;
        }
        else {
            img = req.body.imgfile;
        }

        var author = {
            title: req.body.title,
            image: img,
            about: req.body.about
        }
        //((part#2 point9))
        authordata.findOneAndUpdate({ _id: req.body.id }, { $set: author }, { new: true, useFindAndModify: false }, function (err, data) {
            if (err) {
                res.json({ status: "Failed" });
            }
            else if (data.n == 0) {
                res.json({ status: "No match Found" });
            }
            else {
                res.redirect("/authors");
            }

        })

    })

    return authorsRouter;
}



module.exports = router