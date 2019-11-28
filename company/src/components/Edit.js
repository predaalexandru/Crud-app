import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      company_name: '',
      address: '',
      email: '',
      number:''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('company').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const company = doc.data();
        this.setState({
          key: doc.id,
          company_name: company.company_name,
          address: company.address,
          email: company.email,
          number: company.number
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({company:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { company_name, address, email, number } = this.state;

    const updateRef = firebase.firestore().collection('company').doc(this.state.key);
    updateRef.set({
      company_name,
      address,
      email,
      number
    }).then((docRef) => {
      this.setState({
        key: '',
        company_name: '',
        address: '',
        email: '',
        number:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
             Edit Company
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Company Name:</label>
                <input type="text" class="form-control" name="company_name" value={this.state.company_name} onChange={this.onChange} placeholder="Enter Company Name" />
              </div>
              <div class="form-group">
                <label for="description">Address:</label>
                <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="Address" />
              </div>
              <div class="form-group">
                <label for="author">Email:</label>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter the email" />
              </div>
              <div class="form-group">
                <label for="author">Number:</label>
                <input type="text" class="form-control" name="number" value={this.state.number} onChange={this.onChange} placeholder="Enter telephone number" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;