import React from 'react'
import TextField from 'material-ui/TextField'

const PATH = `https://jfddl4-sandbox.firebaseio.com/bartosz/`

class App extends React.Component {
  state = {
    counter: 0,
    text: ''
  }

  componentDidMount() {
    this.readFromDatabase()
  }

  readFromDatabase = () => {
    const url = `${PATH}/.json`

    return fetch(url)
      .then(r => r.json())
      .then((data) => this.setState({
        counter: data.counter,
        text: data.text
      }))
  }

  saveToDatabase = () => {
    const url = `${PATH}/counter/.json`

    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(this.state.counter)
    }

    return fetch(url, fetchConfig)
  }

  incHandler = () => {
    this.setState({
      counter: this.state.counter + 1
    }, this.saveToDatabase
    )
  }

  decHandler = () => {
    this.setState({
      counter: this.state.counter - 1
    }, this.saveToDatabase
    )
  }

  sendTextToDatabase = () => {
    const url = `${PATH}/text/.json`

    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(this.state.text)
    }

    return fetch(url, fetchConfig)
  }

  render() {
    return (
      <div>
        <h2>{this.state.counter}</h2>
        <button onClick={this.decHandler}>-</button>
        <button onClick={this.incHandler}>+</button>
        <br />
        <TextField
          hintText="Input text"
          onChange={(event, value) => this.setState({text: value})}
          value={this.state.text}
        />
        <button onClick={() => this.sendTextToDatabase()}>Send</button>
      </div>
    )
  }
}

export default App
