var express = require('express');
var router = express.Router();
const fs = require('fs');

const getModel = () => {
    const blogpost = fs.readFileSync("./models/blogposts.json", "utf-8");
    return JSON.parse(blogpost);
}


router.get("/blog", (req, res, next) => {
    const blogpost = getModel();
    if (!blogpost) {
        res.status(404).json({"error": "No Database Found"});
    }
    res.json({message: "Einträge erfolgreich abgerufen.", data: blogpost}).status(200);
});

router.post("/blog", (req, res, next) => {
    const blogposts = getModel();
    const object = req.body;
    console.log(object)
    const newId = blogposts.length > 0 ? blogposts[blogposts.length - 1].id + 1 : 1;
    object.id = newId;
    blogposts.push(object);
    fs.writeFileSync("./models/blogposts.json", JSON.stringify(blogposts, null, 2));
    res.json({message: "Eintrag erfolgreich erstellt.", data: object}).status(201);
});

router.get("/blog/:id", (req, res, next) => {
    const id = Number(req.params.id);
    if (id <= 0) {
        res.status(404).json({"message": "Invalid post ID"});
    }
    const blogpost = getModel();
    if (!blogpost) {
        res.status(404).json({"message": "No Database Found"});
    }

    const post = blogpost.find(p => p.id === id);
    res.json({message: "Eintrag erfolgreich abgerufen.", data: post}).status(200);
})

router.put("/blog/:id", (req, res, next) => {
    const object = req.body;
    const id = Number(req.params.id);
    const blogpost = getModel();
    for (const key in object) {
        blogpost[id-1][key] = object[key];
    }
    fs.writeFileSync("./models/blogposts.json", JSON.stringify(blogpost, null, 2));
    res.json({message: "Eintrag erfolgreich aktualisiert.", data: blogpost[id-1]}).status(200);

})

router.delete("/blog/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const blogpost = getModel();
    const index = blogpost.findIndex(p => p.id === id);
    blogpost.splice(index, 1);
    fs.writeFileSync("./models/blogposts.json", JSON.stringify(blogpost, null, 2));
    res.json({message: "Eintrag erfolgreich gelöscht.", data: blogpost}).status(200);
})


module.exports = router;
