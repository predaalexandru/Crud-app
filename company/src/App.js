import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('company');
    this.unsubscribe = null;
    this.state = {
      company: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const company = [];
    querySnapshot.forEach((doc) => {
      const { company_name, address, email, number } = doc.data();
      company.push({
        key: doc.id,
        doc, // DocumentSnapshot
        company_name,
        address,
        email,
        number,
      });
    });
    this.setState({
      company
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Company List
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Add Company</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {this.state.company.map(company =>
                  <tr>
                    <td><Link to={`/show/${company.key}`}>{company.company_name}</Link></td>
                    <td>{company.address}</td>
                    <td>{company.email}</td>
                    <td>{company.number}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;