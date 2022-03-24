import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []

    }
  this.renderRecentRepos = this.renderRecentRepos.bind(this);
  }

  //rerender same content when refreshed
  componentDidMount() {
    this.renderRecentRepos();
  }

  renderRecentRepos() {
    console.log('you are invoking renderRepos')
    axios.get('/repos')
    .then((response) => {
      this.setState({repos: response.data});
    })
    .catch((err) => {
      console.log('error in client get request', err)
    })
  }


  search (term) {
    console.log(`${term} was searched`)
    axios({
      method: 'POST',
      url: '/repos',
      data: {
        user: `${term}`
    }})
    .then((response) => {
      //automatically updating
      this.renderRecentRepos()
    })
    .catch((err) => {
      console.log('womp wommp')
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));