const { connectToMongoDB } = require("./connection")
const URL = require("./models/url");
const staticRoutes = require("./routes/staticRoutes")
const path = require("path")
const express = require("express");
const app = express();
const port = 8001;

const UrlRoute = require("./routes/url")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("mongoDb connected successfully"))


app.get("/", staticRoutes);
app.use("/url", UrlRoute);

app.get("/:ShortId", async (req, res) => {
    const ShortId = req.params.ShortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId:ShortId,
        },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        }
    );
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURl);
});




app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})