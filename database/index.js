const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

let repoSchema = mongoose.Schema({
  owner_login: String,
  owner_id: Number,
  git_url: String,
  repo_id: {type: Number, unique: true, required: true},
  repo_name: String,
  repo_description: String,
  watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

//
let getAllRepos = () => {
  return Repo.find().sort({watchers_count: -1}).limit(25);
}


let save = (repo) => {
  // This function should save a repo or repos to
  // the MongoDB
  //save repo in databse??
  //input raw repo object
  //repackage it
  //call .save
  let doc = new Repo({
    owner_login: repo.owner.login,
    owner_id: repo.owner.id,
    git_url: repo.html_url,
    repo_id: repo.id,
    repo_name: repo.name,
    repo_description: repo.description,
    watchers_count: repo.watchers_count
  })
  doc.save()
  .catch((err) => {
    console.log(err);
  })
}

module.exports.save = save;
module.exports.getAllRepos = getAllRepos;