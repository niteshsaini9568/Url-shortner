const { nanoid } = require('nanoid');
const urlModel = require("../Models/Model");

module.exports.welcomeMsg = (req, res) => {
    res.send("Welcome to the URL shortener service. You can shorten any URL here.");
};

module.exports.urlShort = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Original URL is required to shorten the link."
            });
        }

        const shortId = nanoid(8);
        let shorted = `http://shorted-url/${shortId}`;
        const urlData = new urlModel({
            originalUrl: originalUrl,
            shortId: shortId,
            shortUrl: shorted,
            clicks: 0,
            lastAccessed: new Date(),
            visitingHistory: []
        });

        await urlData.save();

        res.status(201).json({
            message: "URL has been successfully shortened!",
            data: {
                shortId: urlData.shortId,
                shortUrl: urlData.shortUrl
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred while processing your request. Please try again later."
        });
    }
};

module.exports.shortId = async (req, res) => {
    try {
        let { shortId } = req.params;

        let urlData = await urlModel.findOneAndUpdate(
            { shortId: shortId },
            {
                $push: { visitingHistory: Date.now() },
                $inc: { clicks: 1 }
            },
            { new: true }
        );

        if (!urlData) {
            return res.status(404).json({
                error: "Not Found",
                message: "The provided shortId is not valid or the URL does not exist."
            });
        }

        res.redirect(urlData.originalUrl);
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing the redirection. Please try again later."
        });
    }
};

module.exports.stats = async (req, res) => {
    try {
        let { shortId } = req.params;
        let urlData = await urlModel.findOne({ shortId: shortId });

        if (!urlData) {
            return res.status(404).json({
                error: "Not Found",
                message: "The provided shortId is not valid or the URL does not exist."
            });
        }

        let lastAccessed_Hour = urlData.lastAccessed.getHours();
        let lastAccessed_min = urlData.lastAccessed.getMinutes();
        let lastAccessed_sec = urlData.lastAccessed.getSeconds();
        let lastAccessed_month = urlData.lastAccessed.getUTCMonth() + 1;
        let lastAccessed_day = urlData.lastAccessed.getUTCDate();
        let lastAccessed_year = urlData.lastAccessed.getUTCFullYear();
        let lastAccessed_date = `${lastAccessed_day}/${lastAccessed_month}/${lastAccessed_year}`;
        let lastAccessed_time = `on ${lastAccessed_Hour}:${lastAccessed_min}:${lastAccessed_sec}`;

        let visitingHistory = [...urlData.visitingHistory, urlData.lastAccessed];

        res.json({
            message: "URL Stats",
            data: {
                originalUrl: urlData.originalUrl,
                shortUrl: urlData.shortUrl,
                clicks: urlData.clicks,
                lastAccessed: `Last accessed: ${lastAccessed_date} ${lastAccessed_time}`,
                visitingHistory: `URL visiting history: ${visitingHistory.join(', ')}`
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred while retrieving the stats. Please try again later."
        });
    }
};
