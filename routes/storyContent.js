const express = require('express');
const router = express.Router();

//Get and display the story content
router.get('', async (req, res) => {
    let storyContentIdParam = req.query['storyContentid']
    let storyTitleIdParam = req.query['storyTitleId']

    //get a response from the discord bot
    let response = await fetch(`http://localhost:3001/getStoryContent?storyContentId=${storyContentIdParam}&storyTitleId=${storyTitleIdParam}`);
    let data = await response.json();
    let responseVisual = data;
    res.render('storyView', responseVisual)
});

module.exports = router;