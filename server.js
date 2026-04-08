const openurl = require('openurl');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs');

//Set how the story content is displayed with a story content route
const storyContentRoute = require('./routes/storyContent');
app.use('/storyContent', storyContentRoute);

//Set how the title content is displayed with a title display route
const titleDisplayRoute = require('./routes/titleDisplay');
app.use('/titleDisplay', titleDisplayRoute);

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000/titleDisplay');
})

app.listen(port, function(error) {
    if (error)
        console.log(error);

    console.log(`Server listening on port ${port}`);
});

openurl.open(`http://localhost:${port}/titleDisplay`);