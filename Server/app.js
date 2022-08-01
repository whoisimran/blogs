const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const Router = require('./api/route');
const app = express()
const port = 8080

const username = 'imran';
const password = 'imran';
const cluster = 'cluster0.hepmj';
const dbName = 'blogdb'; 

//Create Connection and new Db
mongoose.connect(
   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}`,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }).then(() => {
           console.log('Mongoose Connection successful')
      }).catch((err) => {
           console.log(`no connectoin error -> ${err}`)
});


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname+'/api/public'))
app.use(Router);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))