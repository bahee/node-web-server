const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = (`${now}: ${req.method} ${req.url}`)

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Umnable to record log')
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('down.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!<h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        greetings: "Welcome to my site"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMsg: '400 Not found'
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/')
});