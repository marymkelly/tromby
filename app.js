const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
//express 
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index', {title: 'Tromby'});
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About: Tromby'});
})

app.get('*', (req, res) => {
	res.redirect('/');
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})