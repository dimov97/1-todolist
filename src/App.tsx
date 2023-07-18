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

type todolistsType = {
    id: string,
    title: string,
    filter: filterType
}
type tasksStateType = {
    [key:string]:tasksType[]
}

function App() {


    function filterTasks(value: filterType, id: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = value
            setTodoslists([...todolists])
        }
    }

    function remooveTask(id: string, todolistId:string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string,todolistId:string) {
        let todolistTasks = tasks[todolistId]
        let task = { id: v1(), title: title, isDone: false }
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    function changeTaskStatus(id: string, isDone: boolean,todolistId:string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodoslists] = useState<todolistsType[]>(
        [
            { id: todolistId1, title: 'new tottolist', filter: 'all' },
            { id: todolistId2, title: 'old totdolist', filter: 'all' },
        ]
    )

    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]: [
            { id: v1(), title: 'html', isDone: true },
            { id: v1(), title: 'css', isDone: true },
            { id: v1(), title: 'js', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'lox', isDone: true },
            { id: v1(), title: 'pidr', isDone: false },
            { id: v1(), title: 'suka', isDone: true },
        ]
    })
    function remooveTodolist(todolistId:string) {
        setTodoslists(todolists.filter(tl=>tl.id!==todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let filteredTask = tasks[tl.id]

                if (tl.filter === 'completed') {
                    filteredTask = filteredTask.filter(t => t.isDone === true)
                }
                if (tl.filter === 'active') {
                    filteredTask = filteredTask.filter(t => t.isDone === false)
                }
                return (
                    <Todolist title={tl.title}
                        id={tl.id}
                        key={tl.id}
                        tasks={filteredTask}
                        remooveTask={remooveTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        remooveTodolist={remooveTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
