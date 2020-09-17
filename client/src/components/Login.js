import React,{Component} from 'react'
import '../components/login.css'
// import axios from 'axios'
import {loginUser} from '../actions/authActions'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            errors:{}
        }
        this.onsubmit = this.onsubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    handleChange(e){
        this.setState({[e.target.id]:e.target.value});
    }
    onsubmit(e){
        e.preventDefault();
        const {email,password} = this.state;
        const newUser={email,password};
        this.props.loginUser(newUser);
    }
    render() {
        return (
            <div className="container login">
                <form className='form' onSubmit={this.onsubmit}>
                <div className="form-group">
                    <label> Email</label>
                    <input onChange={this.handleChange} value={this.state.email}  placeholder="Enter Email" className="form-control" type="text"  id="email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.handleChange} value={this.state.password} placeholder="Enter password" className="form-control" type="password"  id="password"/>
                </div>
                <div className="form-group">
                        <input type="submit" onSubmit={this.onsubmit} className='btn btn-primary'/>
                </div>
            </form>
            </div>
            
        );
    }
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors : state.errors
})
export default connect(mapStateToProps,{loginUser})(withRouter(Login));