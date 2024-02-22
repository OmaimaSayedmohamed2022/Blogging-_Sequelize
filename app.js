const express = require ('express')
const app = express();
const bodyParser= require('body-parser')
const db = require('./config/database')

const userRouter= require('./routers/userRouter')
const postRouter= require('./routers/postRouter')

const PORT = process.env.PORT || 3000 ;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_DATABASE);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DIALECT);
//  sql connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });