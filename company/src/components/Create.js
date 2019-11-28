import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('company');
    this.state = {
      company_name: '',
      address: '',
      email: '',
      number:''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { company_name, address, email, number } = this.state;

    this.ref.add({
      company_name,
      address,
      email,
      number
    }).then((docRef) => {
      this.setState({
        company_name: '',
        address: '',
        email: '',
        number:''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { company_name, address, email, number } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add company
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Company List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Company Name:</label>
                <input type="text" class="form-control" name="company_name" value={company_name} onChange={this.onChange} placeholder="Enter Company Name" />
              </div>
              <div class="form-group">
                <label for="description">Address:</label>
                <textArea class="form-control" name="address" onChange={this.onChange} placeholder="Address" cols="80" rows="3">{address}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Enter Email" />
              </div>
              <div class="form-group">
                <label for="author">Number:</label>
                <input type="text" class="form-control" name="number" value={number} onChange={this.onChange} placeholder="Enter Telephone Number" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;