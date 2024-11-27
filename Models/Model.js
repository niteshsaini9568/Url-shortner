const mongoose = require("mongoose");
const { Schema } = mongoose;

let urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl : {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    },
    visitingHistory: {
        type: [Date],
        default: []
    }
});

let urlModel = mongoose.model("urlModel", urlSchema);

module.exports = urlModel;
