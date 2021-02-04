import React, { Component } from 'react';

class ToyForm extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      image: ""
    }
  }

  handleInputChange = (inputType, event) => {
    this.setState({
      [inputType]: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form"
          onSubmit={event => this.props.createNewToy(event)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"
            onChange={(event) => this.handleInputChange("name", event)}
          />
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"
            onChange={(event) => this.handleInputChange("image", event)}
          />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
