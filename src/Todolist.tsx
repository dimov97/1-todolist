import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { filterType, tasksType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

type todolistType = {
    id: string
    title: string
    tasks: tasksType[]
    remooveTask: (id: string, todolistId: string) => void
    filterTasks: (value: filterType, id: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void

    filter: filterType
    remooveTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title:string) => void
}

export const Todolist: React.FC<todolistType> = ({ title, tasks, remooveTask, filterTasks, addTask, changeTaskStatus, filter, id, remooveTodolist, changeTaskTitle,changeTodolistTitle }) => {

    let onClickAllHandler = () => { filterTasks('all', id) }
    let onClickActiveHandler = () => { filterTasks('active', id) }
    let onClickCompletedHandler = () => { filterTasks('completed', id) }

    const addNewTask = (title: string) => {
        addTask(title, id)
    }
    const remooveTodolistHandler =() => { remooveTodolist(id) }
    const changeTodolistTitleHandler = (title:string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <h3><button onClick={remooveTodolistHandler}>x</button> <EditableSpan title={title} onChange={changeTodolistTitleHandler}/></h3>
            <AddItemForm addItem={addNewTask} />
            <ul>
                {tasks.map((t: tasksType) => {
                    const onClickHandler = () => { remooveTask(t.id, id) }
                    let onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newTaskSatus = e.currentTarget.checked
                        changeTaskStatus(t.id, newTaskSatus, id)
                    }
                    let onChangeTaskTitleHandler = (title: string) => {
                        changeTaskTitle(t.id, title, id)
                    }
                    return (
                        <li key={t.id} className={t.isDone === true ? 'done' : ''}>
                            <button onClick={onClickHandler}>x</button>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler} />
                            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler} />
                        </li>)
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'activeButton' : ''} onClick={onClickAllHandler}>All</button>
                <button className={filter === 'active' ? 'activeButton' : ''} onClick={onClickActiveHandler}>Active</button>
                <button className={filter === 'completed' ? 'activeButton' : ''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}