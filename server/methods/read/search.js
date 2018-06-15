
/**
 * Look at the below link to understand more how search works
 * https://github.com/meteorhacks/search-source
 *
 * meteor add meteorhacks:search-source
 * Running the above command will add the Meteor package needed
 * for the below code to work
 */
SearchSource.defineSource('drivers', function(searchText, options) {
  var options = {sort: {createdAt: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [{StaffName: regExp}, {StaffEmail: regExp}]};
    return Driver.find(selector, options).fetch();
  } else {
    return Driver.find({}, options).fetch();
  }
});

SearchSource.defineSource('users', function(searchText, options) {
  var options = {sort: {createdAt: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [{'email.address': regExp}, {'profile.name': regExp}]};
    return Meteor.users.find(selector, options).fetch();
  } else {
    return Meteor.users.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}
