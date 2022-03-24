const express = require('express');
const github = require('../helpers/github.js');
let app = express();

const saveRepo = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

//API or database
app.post('/repos', function (req, res) {
  const {user} = req.body;
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(user, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.forEach((repo) => {
        saveRepo.save(repo);
      })
      res.status(201).end();
    }
  });

});

app.get('/repos', function (req, res) {
  //This route should send back the top 3 repos
  //grab all the repos and sort them by
  //call exec and do error first thing

  saveRepo.getAllRepos()
  .then((docs) => {
    res.send(docs)
  })
  .catch((err) => {
    console.log('error in server index')
  })


});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

