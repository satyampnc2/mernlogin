import React, { Component } from 'react'
import '../components/register.css'
// import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {registerUser} from '../actions/authActions'
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            name:'',
            password:'',
            errors:{}
            
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.id]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const {email,name,password} = this.state;
      const newUser = {email,name,password};
      this.props.registerUser(newUser,this.props.history);
    }
    componentWillReceiveProps(nextProps){
       if(nextProps.errors){
           this.setState({
               errors:nextProps.errors
           })
       }
    }
    render() {
        return (
            <div className="container register">
                <form className='form' onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Email Address</label>
                        <input placeholder="Enter email" className="form-control" type="email" value={this.state.email} onChange={this.handleChange} id="email"/>
                    </div>
                    <div className="form-group">
                        <label> Name</label>
                        <input value={this.state.name} onChange={this.handleChange} placeholder="Enter username" className="form-control" type="text"  id="name"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input value={this.state.password} onChange={this.handleChange} placeholder="Enter password" className="form-control" type="password"  id="password"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" onSubmit={this.onSubmit} className='btn btn-primary'/>
                    </div>
                </form>
            </div>
            
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth,
    errors:state.errors
})
export default connect(mapStateToProps,{registerUser})(withRouter(Register))
