import React from 'react'
import { filterType, tasksType } from './App'

type todolistType = {
    title: string
    tasks: tasksType[]
    remooveTask:(id:number)=>void
    filterTasks:(value:filterType)=>void
}

export const Todolist: React.FC<todolistType> = ({ title, tasks,remooveTask,filterTasks }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasks.map((t: tasksType) => {
                    return (
                        <li key={t.id}>
                            <button onClick={()=>{remooveTask(t.id)}}>x</button>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={()=>{filterTasks('all')}}>All</button>
                <button onClick={()=>{filterTasks('active')}}>Active</button>
                <button onClick={()=>{filterTasks('completed')}}>Completed</button>
            </div>
        </div>
    )
}