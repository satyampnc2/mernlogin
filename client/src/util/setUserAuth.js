import axios from 'axios'

export default function(token){
    if(token){
        console.log('header set')
        axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}