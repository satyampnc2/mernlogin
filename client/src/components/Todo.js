import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
function Todo(props) {
    const deleteHandler = ()=>{
        props.toDelete(props.text);
    }
    const completeHandler = (e) => {
        props.toComplete(props.text);
    }
    return (
        <div className="todo-item">
            <div className="todo-item-text">
                {props.text}
            </div>
            <button onClick={completeHandler} className="check">
                <FontAwesomeIcon className="check" icon={faCheck}></FontAwesomeIcon>
            </button>
            <button onClick={deleteHandler} className="delete">
                <FontAwesomeIcon  className="delete" icon={faTrash}></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default Todo
