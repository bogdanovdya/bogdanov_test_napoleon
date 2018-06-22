'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TaskSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        default: "Текст заголовка"
    },
    text: {
        type: String,
        default: "Текст заметки"
    },
    date_create: {
        type: Number
    },
    date_update: {
        type: Number
    }
}, {
    collection: 'Tododb'});

module.exports = mongoose.model('Task', TaskSchema);