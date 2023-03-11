const express = require("express");
const app = express();
const mongoose = require("mongoose")
const ejs = require("ejs")

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine","ejs")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/wikiDB");
  }

  const articleSchema = new mongoose.Schema ({
    title:String,
    content:String
  });

  const Article = new mongoose.model ("Article", articleSchema);

///////////////////////////////All Articles Route/////////////////////////////////////
app.route("/articles")

.get(async (req, res) => {
  await Article.find().then(foundArticles => {
    res.send(foundArticles);
  }).catch(err => {
    console.log(err);
  })
})

.post(async (req, res) => {
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save().then(success => {
        console.log("Succesfully added a new article");
    }).catch(err => {
        console.log(err);
    })
})

.delete(function(req,res){
    Article.deleteMany({})
    .then(()=> {
        res.send("Successfully deleted all the articles.")
    })
    .catch(err => {
        console.log(err);
    })
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
