const path = require("path");
const express = require("express");
const app = express();
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const public = path.join(__dirname, '.','public');

app.use(express.static(public));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	console.log('PUBLIC', public);
  res.render('index', {title: 'Tromby'});
})

app.get('*', (req, res) => {
	res.redirect('/');
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})