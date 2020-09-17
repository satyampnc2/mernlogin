import React, { Component } from 'react'
import './dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import Todo from './Todo'
import {connect} from 'react-redux'
import axios from 'axios'
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoText : '',
            elements:[],
            toDelete:'',
            toDisplay:[],
            completed:[],
            ongoing:[],
            isComplete:'',
            currentListing:'all'
        }
        this.addTodo = this.addTodo.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.completeObject = this.completeObject.bind(this);
    }
    async componentDidMount(){
        if(!localStorage.getItem("jwtToken")){
            this.props.history.push('/login')
        } else{
            const config = {
                headers:{
                    'auth-token': localStorage.getItem("jwtToken") 
                }
            }
            await axios.get('/tasks',config)
            .then(res=>{
                if(res){
                    let incompleteTasks = [];
                    let completedTasks = [];
                    for(let i=0;i<res.data.length;i++){
                        let obj = {
                            status:res.data[i].status,
                            text:res.data[i].text, 
                            element: <Todo key={res.data[i].text} 
                            text={res.data[i].text} 
                            toDelete={this.deleteObject}
                            toComplete={this.completeObject}
                            ></Todo>
                        }
                        if(res.data[i].status === 'incomplete')
                            incompleteTasks.push(obj);
                        else
                            completedTasks.push(obj);
                    }
                    this.setState({
                        elements : [...this.state.elements,...incompleteTasks,...completedTasks],
                        ongoing : [...this.state.ongoing,...incompleteTasks],
                        completed : [...this.state.completed,...completedTasks]
                    })
                }
            })
            if(this.state.currentListing === 'all'){
                 this.setState({toDisplay:[...this.state.elements]});
            } else if(this.state.currentListing === 'incomplete'){
                 this.setState({toDisplay:[...this.state.ongoing]});
            } else{
                 this.setState({toDisplay:this.state.completed.slice()})
            }
        }
    }
    changeHandler(e){
        this.setState({todoText:e.target.value});
    }
    async completeObject(value){
        // this.setState({isComplete : value});
        const config = {
            headers:{
                "auth-token" : localStorage.getItem("jwtToken")
            }
        }
        await axios.post('/tasks/updateTask',{text:value},config)
        .then(res=>console.log(res))
        .catch(err=>console.log('error occured :'+err));
        let completedElement ={};
        this.state.elements.forEach(elem=>{
            if(elem.text===value)
            {
                completedElement = {...elem}
            }
        })
        completedElement.status='completed'
        await this.setState({
            elements:[...this.state.elements,completedElement]
        }) 
        await this.setState({
            elements: this.state.elements.filter(element=>element.text!==value || element.status!=='incomplete'
            ),
            completed: [...this.state.completed,completedElement],
            ongoing: this.state.ongoing.filter(elem=>elem.text!==value)
        })
        if(this.state.currentListing === 'all'){
            this.setState({toDisplay:[...this.state.elements]});
        } else if(this.state.currentListing === 'incomplete'){
            this.setState({toDisplay:[...this.state.ongoing]});
        } else{
            this.setState({toDisplay:this.state.completed.slice()})
        }
        
    }
    async deleteObject(value){
        await this.setState({toDelete:value});
        const config = {
            headers:{
                'auth-token': localStorage.getItem("jwtToken") 
            }
        }
        await axios.post('/tasks/deleteTask',{text:value},config)
        .then(res=>{
            this.setState({
                elements: this.state.elements.filter(element=>element.text !==this.state.toDelete),
                completed: this.state.completed.filter(element=>element.text !==this.state.toDelete),
                ongoing: this.state.ongoing.filter(element=>element.text !==this.state.toDelete)
            })
        })
        .catch(err=>console.log('error occured :'+err))
        if(this.state.currentListing === 'all'){
            await this.setState({toDisplay:this.state.elements.slice()});
        } else if(this.state.currentListing === 'incomplete'){
            await this.setState({toDisplay:this.state.ongoing.slice()});
        } else{
            await this.setState({toDisplay:this.state.completed.slice()})
        }
    }
    
    async addTodo(e){
       
        const config = {
            headers:{
                'auth-token': localStorage.getItem("jwtToken") 
            }
        }
        const newtask = {
            text:this.state.todoText,
            status:'incomplete'
        }
        axios.post('/tasks/addTask',newtask,config)
        .then(res=>console.log(res.data))
        .catch(err=>console.log('error occured : '+err));
        await this.setState({todoText:''});
    }
    async selectHandler(e){
        e.preventDefault();
        await this.setState({
            currentListing:e.target.value
        })
        if(this.state.currentListing === 'all'){
            await this.setState({toDisplay:this.state.elements.slice()});
        } else if(this.state.currentListing === 'incomplete'){
            await this.setState({toDisplay:this.state.ongoing.slice()});
        } else{
            await this.setState({toDisplay:this.state.completed.slice()})
        } 

    }

    render() {
        return (
            <div className="dash-container">
                <div className="todoHeader">
                    {this.props.user.name}'s ToDo list
                </div>
                <div className="addTodo">
                    <form classaName="TodoForm" onSubmit={this.addTodo}>
                        <input className="todo-input" value={this.state.todoText} onChange={this.changeHandler} type="text"/>
                        <button className="todo-button" type="submit"><FontAwesomeIcon className="plusIcon" icon={faPlusSquare}></FontAwesomeIcon> </button>
                    </form>
                    <div className="filter">
                        <select className="todo-select" ref={ele => this.myDiv = ele} onChange={this.selectHandler}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="incomplete">Incomplete</option>
                        </select>
                        
                    </div>
                </div>
                <div className="todo-conatiner">
                    <ul className="todoList">
                        {this.state.toDisplay.map((element)=>element.element)}
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.auth.user
})
export default connect(mapStateToProps,null)(Dashboard)