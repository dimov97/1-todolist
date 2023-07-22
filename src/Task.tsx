import React, { ChangeEvent, useCallback } from 'react'
import { tasksType } from './App'
import { Button, Checkbox } from '@mui/material'
import { EditableSpan } from './EditableSpan'
import { RemoveCircle } from '@mui/icons-material'

type taskType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    remooveTask: (id: string, todolistId: string) => void
    t:tasksType
    id:string

}

export const Task:React.FC<taskType> = ({changeTaskStatus,changeTaskTitle,remooveTask,id,t}) => {
    const onClickHandler = () => { remooveTask(t.id, id) }
    let onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTaskSatus = e.currentTarget.checked
        changeTaskStatus(t.id, newTaskSatus, id)
    }
    let onChangeTaskTitleHandler = useCallback( (title: string) => {
        changeTaskTitle(t.id, title, id)
    },[changeTaskTitle,id,t.id]) 
    return (
        <div key={t.id} className={t.isDone === true ? 'done' : ''}>
            <Button variant="outlined" onClick={onClickHandler}><RemoveCircle/></Button>
            <Checkbox checked={t.isDone} onChange={onChangeTaskStatusHandler} />
            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler} />
        </div>)
}
