// const http = require("http");     // We don't need it anymore
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

/** This is for Handlebars */
const expressHbs = require('express-handlebars');

const app = express();

/** This is for Handlebars */
app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

/** This is for Pug */
// app.set('view engine', 'pug');
// app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// app.use((req, res, next) => {
//     console.log("In the middleware");
//     next(); // Allows the request to continue to the next middleware in line
// });

// app.use('/', (req, res, next) => {
//     // console.log("This will works always!!");
//     next();
// });


/** It can't parse all types of bodies, but can handle of form data. Another types of parsers will be used in the next
 * lectures */
app.use(bodyParser.urlencoded({extended: false}));

/** Access to folder with files, that can serve statically, but for reading only */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);  // Path 'hostname/admin/anotherPath' FILTRATION!!!
app.use(shopRoutes);

app.use((req, res, next) => {
    res
        .status(404)
    // .send('<h1>Page not found!</h1>')
    /** This is for usual HTML */
    // .sendFile(path.join(__dirname, 'views', '404.html'))
    /** And this is for PUG */
    /** And this is for Handlebars too */
    res.render('404', {pageTitle: '404'});

});


/** It is classical way to create server */
// const server = http.createServer(app);
//
// server.listen(3000);

app.listen(3000);