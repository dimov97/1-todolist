import { AddCircle } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

type addItemFormType = {
    addItem: (title: string) => void

}

export const AddItemForm: React.FC<addItemFormType> = ({ addItem }) => {
    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<null | string>(null)
    let addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addItem(newTitle.trim())
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
    return (
        <div>
            <TextField size="small" error={!!error}
                helperText={error}
                label="new title" variant="outlined" value={newTitle} onChange={onChandeHandelr}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            /> <Button variant="outlined" onClick={addTaskHandler}><AddCircle /></Button>
        </div>
    )
}
