import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type tasksType = {
    id:number
    title:string
    isDone:boolean
}
export type filterType = 'all'|'completed'|'active'

function App() {
    let [tasks,setTasks] = useState( [
        {id:1, title:'html',isDone:true},
        {id:2, title:'css',isDone:true},
        {id:3, title:'js',isDone:false},
    ])

    let [filter, setFilter] = useState<filterType>('all')

    let filteredTask = tasks

    if (filter === 'completed') {
        filteredTask = tasks.filter(t=>t.isDone===true)
    }
    if (filter === 'active') {
        filteredTask = tasks.filter(t=>t.isDone===false)
    }
    function filterTasks(value:filterType) {
        setFilter(value)
    }

    function remooveTask(id:number) {
        let filteredTasks = tasks.filter(t=>t.id!==id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title={'ihor'}
            tasks ={filteredTask}
            remooveTask={remooveTask}
            filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
