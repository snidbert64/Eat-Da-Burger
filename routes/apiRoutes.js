// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends")


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    var bestMatch;
    var difference;
    var lowestDifference = 1000;
    for (var i = 0; i < friends.length; i++) {
      difference = 0;
      for (var j = 0; j < req.body.scores.length; j++) {
        difference += Math.abs(friends[i].scores[j] - req.body.scores[j]);
      }
      if (difference < lowestDifference) {
        lowestDifference = difference;
        bestMatch = i;
      }
    }
    res.json(friends[bestMatch]);
    friends.push(req.body);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
};
