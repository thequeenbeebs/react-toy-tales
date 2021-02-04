import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        toys: data
      })
    })
  }

  createNewToy = (event) => {
    event.preventDefault()
    let newToy= {
      name: event.target.name.value,
      image: event.target.image.value
    }
    event.target.reset()
    let reqPack = {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newToy)
    }
    fetch('http://localhost:3000/toys', reqPack)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        toys: [...this.state.toys, data]
      })
      
    })
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {method: 'DELETE'})
    this.setState({
      toys: this.state.toys.filter(toy => toy.id !== id)
    })
  }

  updateLikes = (toy) => {
    let moreLikes = {
      likes: ++toy.likes
    }

    let reqPack = {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(moreLikes)
    }

    fetch(`http://localhost:3000/toys/${toy.id}`, reqPack)
      .then(resp => resp.json())
      .then(newToy => {
        this.setState({
          toys: this.state.toys.map(toy => (toy.id === newToy.id) ? newToy : toy)
        })
      })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createNewToy={this.createNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} updateLikes={this.updateLikes}/>
      </>
    );
  }

}

export default App;
