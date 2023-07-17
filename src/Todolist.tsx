import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { filterType, tasksType } from './App'

type todolistType = {
    title: string
    tasks: tasksType[]
    remooveTask:(id:string)=>void
    filterTasks:(value:filterType)=>void
    addTask:(title:string)=>void
}

export const Todolist: React.FC<todolistType> = ({ title, tasks,remooveTask,filterTasks,addTask }) => {
    let [newTitle, setNewTitle] = useState('')
    let addTaskHandler = ()=>{
        addTask(newTitle)
        setNewTitle('')
    }
    let onChandeHandelr = (e:ChangeEvent<HTMLInputElement>)=>{setNewTitle(e.currentTarget.value)}
    let onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=>{if(e.key==='Enter') {
        addTaskHandler()
    }}
    let onClickAllHandler = ()=>{filterTasks('all')}
    let onClickActiveHandler = ()=>{filterTasks('active')}
    let onClickCompletedHandler = ()=>{filterTasks('completed')}
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChandeHandelr}
                onKeyDown={onKeyDownHandler}
                 />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map((t: tasksType) => {
                    const onClickHandler = ()=>{remooveTask(t.id)}
                    return (
                        <li key={t.id}>
                            <button onClick={onClickHandler}>x</button>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}