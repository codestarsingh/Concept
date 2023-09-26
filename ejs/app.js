const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const items = ['Buy food', 'Cook food', 'Eat food'];
const workItems = [];

app.get('/', function(req, res) {

    const day = date.getDate();
    res.render('list', {listTitle: day, newListItems: items});
});

app.post('/', function(req, res) {

    const item = req.body.newItem;
    if(req.body.list == 'Work') {
        workItems.push(item);
        res.redirect('/work');
    }else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req, res) {
    res.render('list', {listTitle: 'Work List', newListItems: workItems});
});


app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});

// When we first load up our home page we go through this route and we render list passing in
// 2 variables, one called kindOfDay and another called newListItems. Now newListItems is set to equal
// the items array which starts off containing three strings buy food, cook food, eat food and this gets
// passed in to list.ejs under variable name newListItems and over here we have a for loop that loops 
// through entire length of newListItems array and it renders a new li for each item inside the array.

// When we click the submit button, our form will make a post request to the home route and it will
// post the value of our text input which has a name newItem. 
// When this request is received it gets caught inside the app.post section and we tap into the request,
// looking through the body of the post request and search for the value of something called newItem, save
// it in a variable item and add that to items array and then redirect to home route. So now we go back 
// over here and render list.ejs again, passing over the updated items array.