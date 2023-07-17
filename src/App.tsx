import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'completed' | 'active'

function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: 'html', isDone: true },
        { id: v1(), title: 'css', isDone: true },
        { id: v1(), title: 'js', isDone: false },
    ])

    let [filter, setFilter] = useState<filterType>('all')

    let filteredTask = tasks

    if (filter === 'completed') {
        filteredTask = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        filteredTask = tasks.filter(t => t.isDone === false)
    }
    function filterTasks(value: filterType) {
        setFilter(value)
    }

    function remooveTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }

    }

    return (
        <div className="App">
            <Todolist title={'ihor'}
                tasks={filteredTask}
                remooveTask={remooveTask}
                filterTasks={filterTasks}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
