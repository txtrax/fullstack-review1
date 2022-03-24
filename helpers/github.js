const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  console.log(username);
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //axios get re into git hub api and pass in option
  axios(options)
  .then((response) => {
    callback(null, response.data);
  })
  .catch((err) => {
    callback(err);
  });

}

module.exports.getReposByUsername = getReposByUsername;