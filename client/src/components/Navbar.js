import React,{Component} from 'react'
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';
class Navbar extends Component {
    constructor(props){
        super(props);
        this.state =  {
            element : ''
        }
        this.onlogoutClick = this.onlogoutClick.bind(this);
    }
    onlogoutClick(e){
        this.props.logoutUser()
    }
    componentDidMount(){
        const isAuthenticated = this.props.auth.isAuthenticated;
        const user = this.props.auth.user;
        if(isAuthenticated){
            this.setState({
                element: <ul className='navbar-nav'>
                    <li className="nav-item">Hello, {user.name}</li>
                    <li className="nav-item">
                        <a href="/" onClick={this.onlogoutClick} className="nav-link">LogOut</a>
                    </li>
                </ul>
            }) 
        } else{
            this.setState({
                element: <ul className='navbar-nav'>
                    <li className="nav-item">
                        <a href="/register" className="nav-link">Register</a>
                    </li>
                    <li className="nav-item">
                        <a href="/login"  className="nav-link">Login</a>
                    </li>
                </ul>
            }) 
        }
    }
    componentWillReceiveProps(nextProps){
        const isAuthenticated = nextProps.auth.isAuthenticated;
        const user = nextProps.auth.user;
        if(isAuthenticated){
            this.setState({
                element: <ul className='navbar-nav'>
                    <li className="nav-link">Hello, {user.name}</li>
                    <li className="nav-item">
                        <a href="/" onClick={this.onlogoutClick} className="nav-link">LogOut</a>
                    </li>
                </ul>
            }) 
        } else{
            this.setState({
                element: <ul className='navbar-nav'>
                    <li className="nav-item">
                        <a href="/register" className="nav-link">Register</a>
                    </li>
                    <li className="nav-item">
                        <a href="/login"  className="nav-link">Login</a>
                    </li>
                </ul>
            }) 
        }
    }
    render() {
        return (
            <div className='navbar navbar-expand-sm navbar-light bg-light'>
                <div className="navbar-brand">
                    <a style={{color:'black'}} className="nav-link" href='/'>Satyam's Website</a>
                </div>
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link active">Contact</a>
                        </li>
                    </ul>
                    {
                        this.state.element
                    }
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = (state)=>({
    auth : state.auth
})
export default connect(mapStateToProps,{logoutUser})(Navbar)
