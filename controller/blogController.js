const fs = require('fs');

const getModel = () => {
    const blogpost = fs.readFileSync("./models/blogposts.json", "utf-8");
    return JSON.parse(blogpost);
}

function getAllPosts(req, res, next) {
    const blogpost = getModel();
    if (!blogpost) {
        res.status(404).JSON({"error": "No Database Found"});
    }
    res.json(blogpost).status(200);
}

function getPost(req, res, next) {
    const id = Number(req.params.id);
    if (id <= 0) {
        res.status(404).JSON({"error": "Invalid post ID"});
    }
    const blogpost = getModel();
    if (!blogpost) {
        res.status(404).JSON({"error": "No Database Found"});
    }

    const post = blogpost.find(p => p.id === id);
    res.json(post).status(200);

}

function createPost(req, res, next) {
    const blogposts = getModel();
    const object = req.body;
    const newId = blogposts[blogposts.length - 1].id + 1;
    object.id = newId;
    blogposts.push(req.body);
    fs.writeFileSync("./models/blogposts.json", JSON.stringify(blogposts, null, 2));
    console.log(req.files);
    res.sendStatus(200);
}


module.exports = { getAllPosts, getPost, createPost };