const express = require("express"),
	  app = express(),
	  ejs = require("ejs"),
	  path = require("path"),
	  port = 3000;

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'html');;


app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/test', (req, res) => {
	res.render('experiment.html')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})