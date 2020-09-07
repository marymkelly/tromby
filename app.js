const express = require("express"),
	  app = express(),
	 // paper = require("paper"),
	  port = 3000;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})