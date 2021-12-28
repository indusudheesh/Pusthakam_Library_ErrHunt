
// 1.in package.json "main": "server.js" changed to "main": "app.js", ((part#1 point1))
// 2.Express Module missing(folder node module is missing) npm install ((part#1 point2))
// 3./src/routes/homeroute changed to /src/routes/homerouter ((part#1:point3))
// 4.in casestudy\src\data\user.js user is not defined.user is changed to users ((part#1 point4))
// 5.prompt port 3000 changed to port 5000 ((part#1 point5))
// 6.passing constant array nav for rendering navbar links of ejs pages ((part#2 point6))
// 7.make use of cors module ((part#2 point7))
// 8.In authorsroute.js req.body.images changes to req.body.image as name parameter is set to image ((part#2 point8))
// 9.In boosroute and authorsroute delete and update functions are modified ((part#2 point9))
// 10.creating a database collection to store user credentials and change routes and request methods appropriately ((part#2 point 10))



const express = require('express');
const path = require('path');
const cors = require('cors');
const app = new express;
const port=process.env.PORT || 5000;


const nav = [
    {
        link: "/books",
        title: "Books"
    },
    {
        link: "/authors",
        title: "Authors"
    },
    {
        link: "/books/addbook",
        title: "Add Book"
    },
    {
        link: "/authors/addauthor",
        title: "Add Author"
    }
]

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');

// /src/routes/homeroute changed to /src/routes/homerouter ((part#1:point3))
//passing constant array nav for rendering navbar links of ejs pages ((part#2 point6))
const homeRouter = require('./src/routes/homerouter')(nav);
const booksRouter = require('./src/routes/booksroute')(nav);
const authorsRouter = require('./src/routes/authorsroute')(nav);




app.set('views', './src/views');
app.set('view engine', 'ejs');

//make use of cors module ((part#2 point7))
app.use(cors());

//bodyParser.urlencoded changed to express.urlencoded ((part#1:point2))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//always add routes after all middlewares
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/home', homeRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);



app.get('/', (req, res) => {

    res.render('index', {

    });

});





app.listen(port, () => {
    //prompt port 3000 changed to port 5000 ((part#1 point5))
    console.log("Server Ready on 5000");
});