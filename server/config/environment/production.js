'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/topshelfguild'
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'topk3k',
    MONGO_URI: process.env.MONGO_URI || 'localhost',
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'Facebook App Secret',
    FOURSQUARE_SECRET: process.env.FOURSQUARE_SECRET || 'Foursquare Client Secret',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'Google Client Secret',
    GITHUB_SECRET: process.env.GITHUB_SECRET || 'GitHub Client Secret',
    LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'LinkedIn Client Secret',
    TWITTER_KEY: process.env.TWITTER_KEY || 'Twitter Consumer Key',
    TWITTER_SECRET: process.env.TWITTER_SECRET || 'Twitter Consumer Secret',
    TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || 'Twitter Callback Url'
};