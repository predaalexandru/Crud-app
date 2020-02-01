import React, { Component } from 'react';
// eslint-disable-next-line
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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Add company
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Company List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Company Name:</label>
                <input type="text" className="form-control" name="company_name" value={company_name} onChange={this.onChange} placeholder="Enter Company Name" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Address:</label>
                <textarea className="form-control" name="address" onChange={this.onChange} placeholder="Address" cols="80" rows="3">{address}</textarea>
              </div>
              <div className="form-group">
                <label htmlFor="author">Email:</label>
                <input type="text" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="Enter Email" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Number:</label>
                <input type="text" className="form-control" name="number" value={number} onChange={this.onChange} placeholder="Enter Telephone Number" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;