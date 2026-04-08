const express = require('express');
const router = express.Router();

const incrementAmmount = 4;
//#endregion

//#region http methods
router.get('', (req, res) => {
    res.redirect('http://localhost:3000/titleDisplay/0');
})

router.get('/:titleIndexId', async (req, res) => {
    let titleIndexNumber = parseInt(req.params.titleIndexId);
    
    //Test if below range
    if (titleIndexNumber < 0){
        res.redirect('http://localhost:3000/titleDisplay/0');
    }

    //Test if there is no titles present

    //Test if there is out of max bounds. If so, return to beginning

    //To do normally
    else{

        let listOfPartialTitles = ['', '']
        try{
            var response = await fetch(`http://localhost:3001/getTitles?incomingIndex=${titleIndexNumber}&incrementAmmount=${incrementAmmount}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const jsonData = await response.json(); // Wait for the JSON parsing
            listOfPartialTitles = jsonData.listOfTitles; // Access the property
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            res.render('titleView', {listOfTitles:["", ""], titleIdIndex:titleIndexNumber})
        }

        if (listOfPartialTitles[0] === undefined)
            res.redirect('http://localhost:3000/titleDisplay/0');
        
        if (listOfPartialTitles[0] === '')
            res.redirect('http://localhost:3000/titleDisplay/0');
        

        res.render('titleView', {listOfTitles:listOfPartialTitles, titleIdIndex:titleIndexNumber});
    }
})

router.get('/:titleIndexId/incrementIndex', (req, res) => {
    let newTitleIndexNumber = parseInt(req.params.titleIndexId) + incrementAmmount;

    res.redirect(`http://localhost:3000/titleDisplay/${newTitleIndexNumber}`)
})

router.get('/:titleIndexId/decrementIndex', (req, res) => {
    let newTitleIndexNumber = parseInt(req.params.titleIndexId) - incrementAmmount;

    res.redirect(`http://localhost:3000/titleDisplay/${newTitleIndexNumber}`)
})
//#endregion

module.exports = router;