import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Container from './views/Paper-redefined'

const PATH = `https://jfddl4-sandbox.firebaseio.com`

class App extends React.Component {
  state = {
    newTask: '',
    tasks: []
  }

  componentDidMount() {
    this.readFromDatabase()
  }

  readFromDatabase = () => {
    const url = `${PATH}/bartosz/tasks/.json`

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const dataToArray = (
          Object.entries(data || {})
            .map(([id, task]) => ({
              id,
              task
            }))
        )
        console.log(dataToArray)
        this.setState({
          tasks: dataToArray
        })
        console.log(this.state.tasks)
      })
  }

  textHandler = (event, value) => (
    this.setState({
      newTask: value
    })
  )

  sendToDatabase = () => {
    const url = `${PATH}/bartosz/tasks/.json`

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(
        this.state.newTask)
    }

    fetch(url, fetchConfig)

    this.setState({
      newTask: ''
    })
  }

  deleteTaskFromDatabase = (id) => {
    const url = `${PATH}/bartosz/tasks/${id}/.json`

    const fetchConfig = {
      method: "DELETE"
    }

    fetch(url, fetchConfig)
      .then(this.readFromDatabase)
  }

  render() {
    return (
      <div>
        <Container>
          <TextField
            fullWidth={true}
            name={'new-task'}
            value={this.state.newTask}
            onChange={this.textHandler}
          />
          <RaisedButton
            fullWidth={true}
            label={<strong>Send to database!</strong>}
            primary={true}
            onClick={this.sendToDatabase}
          />
        </Container>
        <Container>
          <div>
            <h2>
              List of your tasks:
            </h2>
            <ul>
              {this.state.tasks.map(
                el => (
                  <li key={el.id}
                    onClick={() => this.deleteTaskFromDatabase(el.id)}
                  >
                    {el.task}
                  </li>
                ))
              }
            </ul>
          </div>
        </Container>
      </div>
    )
  }
}

export default App
