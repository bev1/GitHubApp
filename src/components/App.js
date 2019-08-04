import React from 'react';
import SplashScreen from './SplashScreen';
import SearchArea from './SearchArea';
import ReposList from './ReposList';
import Pagination from './Pagination';
import DetailInfo from './DetailInfo';
import arraySort from 'array-sort';

class App extends React.Component{
  constructor() {
    super()
    this.state={
      splashScreen: true,
      searchTerm: '',
      repos: [],
      totalResults: 0,
      currentPage: 1,
      currentRepo: null,
      sortBy: 'name',
      favoritesId: [],
    }
  }
  componentWillMount () {
    setTimeout(() => {
      this.setState({splashScreen: false})
    }, 3000);
  }

  componentDidMount () {
    this.setState({favoritesId: localStorage.getItem('favoritesId')})
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/search/repositories?q=${this.state.searchTerm}+in:name`)
    .then(data => data.json())
    .then(data => {
      this.setState ({
        repos: arraySort([...data.items], this.state.sortBy, {reverse: true}),
        totalResults: data.total_count,
        currentPage: 1,
        currentRepo: null
      })
    })
  }

  showMoreSearch = () => {
    fetch(`https://api.github.com/search/repositories?q=${this.state.searchTerm}+in:name&page=${this.state.currentPage+1}`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.repos.concat([...data.items]);
      let newRepos = arraySort(moreItems, this.state.sortBy, {reverse: true})
      this.setState({ repos: newRepos, currentPage: this.state.currentPage+1})
    })
  }

  viewRepoInfo = (id) => {
    const filteredRepos = this.state.repos.filter(repo => repo.id === id)
    const newCurrentRepo = filteredRepos.length > 0 ? filteredRepos[0] : null
    this.setState({ currentRepo: newCurrentRepo})
  }

  closeInfo = () => {
    this.setState({currentRepo: null})
  }

  sortRepos = (e) => {
    this.setState({ sortBy: e.target.value}, this.handleSubmit(e))

  }

  addToFavorites = (id) => {
    const updateFavorites = [this.state.favoritesId, id].filter(Boolean).join(',')
    localStorage.setItem('favoritesId', updateFavorites)
    this.setState({
      favoritesId: updateFavorites
    })
  }

  removeFromFavorites = (id) => {
    const oldFavorites = localStorage.getItem('favoritesId').split(',')
    const filteredRepos = oldFavorites.filter(item => +item !== id)
    localStorage.setItem('favoritesId', filteredRepos.join(','))
    this.setState({
      favoritesId: filteredRepos.join(',')
    })
  }

  render() {
    return (
      <div className='App'>
      {this.state.splashScreen === true ? 
      <SplashScreen splashScreen={this.state.splashScreen} />:
      <div>
      <SearchArea currentRepo={this.state.currentRepo} searchValue={this.state.searchTerm} handleSubmit={this.handleSubmit} handleChange={this.handleChange} repos={this.state.repos} sortBy={this.state.sortBy} sortRepos={this.sortRepos} />
      {this.state.repos.length > 0 && this.state.currentRepo === null ? <ReposList addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites} repos={this.state.repos} viewRepoInfo={this.viewRepoInfo} /> : '' }
      {this.state.currentRepo != null ? <DetailInfo addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites} currentRepo={this.state.currentRepo} closeInfo={this.closeInfo} /> : ''}
      {this.state.totalResults > 30 && this.state.repos.length < this.state.totalResults && this.state.currentRepo === null ? <Pagination showMoreSearch={this.showMoreSearch} /> : ''}
      </div>}
      </div>
    )
  }
}

export default App;
