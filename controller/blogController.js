const fs = require('fs');
const fetch = require('node-fetch');


const handleAPICall = async (url, method, body) => {
    let response; 
    if (body !== undefined) {
        response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            header: { "Content-Type": "application/json" }
        })
    } else {
        response = await fetch(url, {
            method: method,
            header: { "Content-Type": "application/json" } 
        });
    }

    return response.json();
}


async function createIndex(req, res, next) {
    const blogpost = await handleAPICall(`http://localhost/api/blog`, "GET");
    if (!blogpost) {
        res.status(404).JSON({ "message": "No Database Found" });
    }
    res.render("index", { posts: blogpost.data });
}

async function getPost(req, res, next) {
    const result = await handleAPICall(`http://localhost/api/blog/${req.params.id}`, "GET");
    res.render("viewpost", {post: result.data})
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


module.exports = { createIndex, getPost, createPost };