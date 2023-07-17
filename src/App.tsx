import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type tasksType = {
    id:number
    title:string
    isDone:boolean
}

function App() {
    let [tasks,setTasks] = useState( [
        {id:1, title:'html',isDone:true},
        {id:2, title:'css',isDone:true},
        {id:3, title:'js',isDone:false},
    ])

    function remooveTask(id:number) {
        let filteredTasks = tasks.filter(t=>t.id!==id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title={'ihor'}
            tasks ={tasks}
            remooveTask={remooveTask}
            />
        </div>
    );
}

export default App;
