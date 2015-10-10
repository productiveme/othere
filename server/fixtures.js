createFixtures = function() {
  var chance = new Chance();

  //Insert admin user
  Accounts.createUser({
    username: "admin",
    email: "hack@othere.com",
    password: "oddwing75"
  });

  //Insert 5 random users
  for(var i=0; i < 5; i++) {
    Accounts.createUser({
      username: chance.first(),
      email: chance.email(),
      password: chance.string({length:10, pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"})
    });
  };

  userIds = Meteor.users.find({}, {fields: {_id: 1}}).fetch()

  //Insert 10 random posts
  for(var i = 0; i < 10; i++) {
    Posts.insert({
      photoSrc: chance.pick(["http://placehold.it/800x800","http://placehold.it/800x800"]),
      title: chance.word() + ' ' + chance.word(),
      description: chance.sentence({word: 10}).substring(0,160),
      owner: chance.pick(userIds),
      likeCount: 0,
      unlikeCount: 0,
      geo: {
        lat: chance.latitude(),
        lng: chance.longitude()
      },
      timestamp: chance.date({year: 2015}),
      active: true
    });
  }
}
