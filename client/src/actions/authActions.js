import {SET_CURRENT_USER,GET_ERROR} from './types'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import setUserAuth from '../util/setUserAuth';


export const registerUser = (userdata,history) => dispatch =>{
    axios.post('/users/register',userdata)
    .then(res=>history.push('/login'))
    .catch(err=>{
        dispatch({
            type:GET_ERROR,
            payload:err.response.data
        })
    })
}

export const loginUser = (userdata) => dispatch => {
    // setUserAuth('bla');
    axios.post('/auth/',userdata)
    .then(res=> {
        const {token} = res.data;
        localStorage.setItem("jwtToken",token);
        // const decode = jwt_decode(token);
        let config = {
            headers:{
                'auth-token':token
            }
        }
        axios.get('/auth/info',config)
        .then(infoRes=>{
            dispatch({
                type:SET_CURRENT_USER,
                payload:infoRes.data.user
            })
        })
        // console.log('user is :' + res.data);
        
    })
    .catch(err=>{
        dispatch({
            type:GET_ERROR,
            payload:err.response.data
        })
    })
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setUserAuth(false);
    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
};