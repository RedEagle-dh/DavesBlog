const fetch = require('node-fetch');


const handleAPICall = async (url, method, body) => {
    let response; 
    console.log(body)
    if (body !== undefined) {
        response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
    } else {
        response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" } 
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

async function createPost(req, res, next) {
    const object = req.body;
    await handleAPICall("http://localhost/api/blog", "POST", object)
    res.redirect("/");
}


module.exports = { createIndex, getPost, createPost };