const express = require('express');
const router = express.Router();
const blogController = require("../controller/blogController");


router.get("/newPost", (req, res, next) => {
    res.render('form', {
        formSubmit: {
            enctype: 'multipart/form-data',
            method: 'POST',
            action: "/blogpost",
            submitValue: "Senden"
        },
        formInputs: [
            {
                label: "Titel",
                type: "text",
                name: "title",
                required: true,
                class: "form-control",
                id: "inputTitle",
                placeholder: "Titel eingeben"
            },
            {
                label: "Benutzername",
                type: "text",
                name: "username",
                required: false,
                class: "form-control",
                id: "inputUsername",
                placeholder: "Benutzername eingeben"
            },
            {
                label: "Datum",
                type: "date",
                name: "date",
                required: false,
                class: "form-control",
                id: "inputDate"
            },
            {
                label: "Text",
                type: "textarea",
                name: "text",
                required: false,
                class: "form-control",
                id: "inputText",
                rows: 5,
                placeholder: "Text eingeben"
            },
            {
                label: "Wähle eine Bilddatei aus",
                type: "file",
                name: "file",
                required: false,
                class: "form-control",
                id: "inputFile",
                accept: "image/*"
            }
        ]
    });
})


router.route("/")
    .get(blogController.getAllPosts)
    .post(blogController.createPost)

router.route("/:id")
    .get(blogController.getPost)
module.exports = router;