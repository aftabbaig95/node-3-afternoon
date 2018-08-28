const express = require('express'); 
const { json} = require('body-parser');
const session = require('express-session'); 
const app = express(); 
require('dotenv').config(); 
const checkForSession = require('./middlewares/checkForSession'); 
const swag_controller=require('./Controllers/swag_controller'); 
const auth_controller=require('./Controllers/auth_controller'); 
const cart_controller=require('./Controllers/cart_controller'); 
const search_controller=require('./Controllers/search_controller');


app.use(json()); 
app.use(session(
    {
        secret:process.env.SECRET_SESSION , 
        resave: false , 
        saveUninitialized: true
    }
))
app.use(checkForSession); 



app.use( express.static( `${__dirname}/build` ) );

app.get('/api/swag', swag_controller.read );

app.get('/api/user', auth_controller.getUser);
app.post('/api/login', auth_controller.login); 
app.post('/api/register', auth_controller.register); 
app.post('/api/signout', auth_controller.signout); 

app.post('/api/cart', cart_controller.add); 
app.post('/api/cart/checkout', cart_controller.checkout); 
app.delete('/api/cart', cart_controller.delete); 

app.get('/api/search', search_controller.search);

const port = process.env.SERVER_PORT || 3000; 
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})