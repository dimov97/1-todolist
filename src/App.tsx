import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

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
    [key: string]: tasksType[]
}

function App() {


    function filterTasks(value: filterType, id: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = value
            setTodoslists([...todolists])
        }
    }

    function remooveTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({ ...tasks })
    }

    function addTask(title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = { id: v1(), title: title, isDone: false }
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({ ...tasks })
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }

    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({ ...tasks })
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
    function remooveTodolist(todolistId: string) {
        setTodoslists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }
    function addTodolist(title: string) {
        const newTodolistId = v1()
        let newTodo: todolistsType = { id: newTodolistId, title: title, filter: 'all' }
        setTodoslists([newTodo, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }
    function changeTodolistTitle(id:string,title:string) {
        let newTodolistTitle = todolists.find(tl=>tl.id===id)
        if(newTodolistTitle) {
            newTodolistTitle.title=title
            setTodoslists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
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
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
