"use strict";

const ObjectID = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweeter').insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweeter").find().toArray(callback);
    },

    //find id and pass onto updateLikes function
    retrieveTweet: function(id,callback) {
      db.collection("tweeter").findOne({_id:ObjectID(id)},callback)
    },

    //retrive the id of the tweet and increase likes on Mongo
    updateLikes: function(id, callback) {
      this.retrieveTweet(id, function(err, tweet) {
        if (err) {
          callback(err);
        } else {
          db.collection('tweeter').updateOne(
            {_id:ObjectID(id)},
            {$inc: { likes: 1} },
            callback
          )
        }
      })
    },

  }
}