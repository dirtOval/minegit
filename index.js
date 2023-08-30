const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
var fs = require("fs");

const app = express();
const port = process.env.PORT;
const rootDir = process.env.ROOTDIR;

//middleware zone
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());

//routes
app.get('/', (req, res) => {
  res.send(`Root dir is: ${rootDir}`);
});

app.post('/sync', ( req, res) => {
  let dir = JSON.parse(Object.keys(req.body));
  console.log(dir);
  res.send('yay');
});

// app.get('/echotest', (req, res) => {
//   let echo = req.query.echo;
//   console.log(`CC says: ${echo}`);
//   res.send(`it did the thing`);
// })

app.get('/pathtest', (req, res) => {
  // console.log(req);
  let ccPath = req.query.path;
  fs.writeFile(`${process.env.ROOTDIR}/${ccPath}/banana.txt`, 'its a banana', err => {
    if (err) throw err;
    console.log(`adding banana to path "${ccPath}"`)
    res.send("banana added :)");
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}! Happy mining! :)`);
})