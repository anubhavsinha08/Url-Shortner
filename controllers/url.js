const shortid = require('shortid');
const URL = require("../models/url")

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    const ShortId= shortid();
    
    URL.create({
        shortId: ShortId,
        redirectURl: body.url,
        visitHistory:[]
    })
    // return res.json({id:ShortId})
    res.render("home",{
        id:ShortId
    })

}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.ShortId;
  const result = await URL.findOne({ ShortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};