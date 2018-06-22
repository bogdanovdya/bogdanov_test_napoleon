var express = require("express"),
    router = express(),
    mongoose = require("mongoose"),
    Task = require("../models/todoListModel");

router.get("/", (req, res, next) => {
    Task.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.get("/:taskId", (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
        .exec()
        .then(doc => {
            console.log("В базе", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "Не найдено" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post("/", (req, res) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text,
        date_create: req.body.date_create,
        date_update: req.body.date_update
    });
    task.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Запрос обработан",
                createdTask: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put("/", (req, res) => {
    Task.findById(req.body._id, (err, task) => {
        task.title = req.body.title;
        task.text = req.body.text;
        task.date_create = req.body.date_create;
        task.date_update = req.body.date_update;
        task.save()
        res.json(task)
    })
});

router.delete("/", (req, res, next) => {
    var id = req.body._id;
    Task.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;