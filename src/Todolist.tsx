import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { filterType, tasksType } from './App'

type todolistType = {
    title: string
    tasks: tasksType[]
    remooveTask: (id: string) => void
    filterTasks: (value: filterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: filterType
}

export const Todolist: React.FC<todolistType> = ({ title, tasks, remooveTask, filterTasks, addTask, changeTaskStatus, filter }) => {
    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<null | string>(null)
    let addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError('title is required !')
        }
    }
    let onChandeHandelr = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    let onClickAllHandler = () => { filterTasks('all') }
    let onClickActiveHandler = () => { filterTasks('active') }
    let onClickCompletedHandler = () => { filterTasks('completed') }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChandeHandelr}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='errorMessage'>{error}</div>}
            </div>
            <ul>
                {tasks.map((t: tasksType) => {
                    const onClickHandler = () => { remooveTask(t.id) }
                    return (
                        <li key={t.id} className={t.isDone === true ? 'done' : ''}>
                            <button onClick={onClickHandler}>x</button>
                            <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                let newTaskSatus = e.currentTarget.checked
                                changeTaskStatus(t.id, newTaskSatus)
                            }} />
                            <span>{t.title}</span>
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