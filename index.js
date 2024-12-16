import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    //render the home page with the list of blog posts
    res.render("home", { posts: posts });
});


app.get("/edit/:id", (req, res) => {
    let postId = parseInt(req.params.id, 10); // Convert the ID to a number
    if (postId >= 0 && postId < posts.length) {       // Valid ID, proceed
        res.render("edit", { postId: postId, posts:posts });
    } else {
        res.status(400).send("Invalid Post ID");
    }
    });


app.post("/create", (req, res) => {
    const {title, content} = req.body;
    posts.push({ title, content });    
    res.redirect("/");
    console.log("Blog post created successfully.");    
});



app.post("/edit/:id", (req, res) => {
    let postId = parseInt(req.params.id, 10); // Convert the ID to a number
    if (postId >= 0 && postId < posts.length) {       // Valid ID, proceed
        const post = posts[postId];
        posts[postId] = { title: req.body.title, content: req.body.content };
        res.redirect('/');
        console.log("post Edited successfully");
    } else {
        res.status(400).send("Invalid Post ID");
    }
});


app.get("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert the ID to a number
    if (!isNaN(id) && id >= 0 && id < posts.length) { // Validate ID
        posts.splice(id, 1);
        console.log(`Post with ID ${id} deleted successfully.`);
        res.redirect("/");
    } else {
        console.error(`Invalid Post ID: ${id}`);
        res.status(400).send("Invalid Post ID");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Visit http://localhost:3000/");
});