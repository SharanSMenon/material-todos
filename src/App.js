import React from 'react';
import { Paper, Typography, TextField, Button, Checkbox, Divider } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'
import Dialog from "./dialog"
import './App.css';
const styles = {
  root: {
    margin: "0 auto",
    marginTop: 100,
    padding: 20,
    maxWidth: 400,
    marginBottom: 50
  },
  form: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "baseline",
    justifyContent: 'space-evenly'
  },
  list: {
    border: "1px solid gray"
  }
}
export class App extends React.Component {
  constructor(props) {
    super(props);
    let list = JSON.parse(localStorage.getItem("list"))
    if (!list) {
      localStorage.setItem("list", JSON.stringify([]))
    }
    this.state = {
      items: list ? list : [],
      title: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value
    })
  }
  handleCreate(e) {
    e.preventDefault();
    if (this.state.title) {
      this.setState((prevState) => {
        let Items = {
          title: prevState.title,
          id: Date.now(),
          checked: false
        }
        let items = [...prevState.items, Items];
        localStorage.setItem("list", JSON.stringify(items))
        return {
          items,
          title: ""
        }
      })
    }
  }
  handleCheck(id) {
    this.setState(({ items }) => {
      let item = items.find(ex => ex.id === id)
      item.checked = !item.checked
      localStorage.setItem("list", JSON.stringify(items))
      return { items: items }
    })
  }
  handleDelete(id) {
    this.setState(({ items }) => {
      let item = items.filter(ex => ex.id !== id)
      localStorage.setItem("list", JSON.stringify(item))
      return { items: item }
    })
  }
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <Typography variant="h4" align="center" gutterBottom>
          Items
        </Typography>
        <form onSubmit={this.handleCreate} className={classes.form}>
          <TextField
            name='title'
            label='Item'
            value={this.state.title}
            onChange={this.handleChange}
            margin='normal'
            autoComplete="off"
          />
          <Button type='submit' color='primary' variant="contained">
            Create Item
          </Button>
        </form>
        <List>
          {this.state.items.map(({ id, title, checked }) => (
            <ListItem key={id}>
              <Checkbox
                edge="start"
                checked={checked}
                onClick={() => this.handleCheck(id)}
                tabIndex={-1}
              />
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton color='primary' onClick={() => this.handleDelete(id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
          )}
        </List>
        {/* <Divider /> */}
        <Dialog />
      </Paper>
    )
  }
}
export default withStyles(styles)(App)