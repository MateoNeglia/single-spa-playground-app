import React from "react";
import './root.component.css';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: null,
      isLoaded: false,
      products: [],
      users: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:2000/db')
    .then(response => response.json())
    .then(
      (result) => {
        console.log('result users is: ', result.users);
        this.setState({

          isLoaded: true,
          users: result.users,          
          products: result.products
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });        
      }
    )

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    window.rule.donationCount(this.state.value);  
    event.preventDefault();
  }

  sendUsers(props) {

    props.customProp.users = this.state.users;
    props.customProp.products = this.state.products;
    window.dispatchEvent(new Event('dataSent'));
    console.log('here comes from react props: ', this.props.customProp);    
  }

  render() {
    const { error, isLoaded, products, users} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className = 'react-section'>
          <h2>This is REACT, the data is being called here, would you like to sent that to Angular?</h2>
          <button
            className="btn users-btn"
            onClick={() => {
              this.sendUsers(this.props);
              window.dispatchEvent(new Event('dataSent'));}}
          >
            Send All Database data to Angular
          </button>          
          
          <h3>The users from the DB:</h3>
        <ul>
          {users.map(user => (
            <div className="user-pill">
              <li key={user.id}>
                <b>User Name: </b> {user.name} 
              </li>
                <li key={user.id}>
                <b> User Lastname: </b>{user.lastName}
              </li>
            </div>          
            
          ))}
        </ul>
      </section>

      )
    }
    
  }



}

export default Root;