import React from 'react'

const url = 'https://jfddl4-sandbox.firebaseio.com/bartosz/counter/.json'

class App extends React.Component {
  state = {
    counter: 0
  }

  componentDidMount() {
    this.readFromDatabase()
  }

  readFromDatabase = () => {
    return fetch(url)
      .then(r => r.json())
      .then((data) => this.setState({
        counter: data
      }))
  }

  saveToDatabase = (data) => {
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data)
    }

    return fetch(url, fetchConfig)
      .then(this.readFromDatabase)
  }

  incHandler = () => this.saveToDatabase(this.state.counter + 1)

  decHandler = () => this.saveToDatabase(this.state.counter - 1)

  render() {
    return (
      <div>
        <h2>{this.state.counter}</h2>
        <button onClick={this.decHandler}>-</button>
        <button onClick={this.incHandler}>+</button>
      </div>
    )
  }
}

export default App
