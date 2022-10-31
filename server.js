const express  = require("express");
const bodyParser  = require("body-parser");
const mongoose  = require("mongoose");
const shortid = require('shortid');



const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/memory_project_db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
});


const Post = mongoose.model(
    "post",
    new mongoose.Schema({
    _id: {  type: String, default: shortid.generate },
    body: String,
}));

app.get("/api/posts", async (req, res)=>{
    const posts = await Post.find({});
    res.send(posts);

});

app.post("/api/posts", async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.send(savedPost);
});

app.delete("/api/posts/:id", async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.send(deletedPost);
  });

  const Port = process.env.PORT || 3000 ;
  app.listen(Port, console.log("server at http://localhost:3000"));