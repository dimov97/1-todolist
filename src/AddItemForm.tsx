import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

type addItemFormType = {
    addItem: (title: string) => void

}

export const AddItemForm: React.FC<addItemFormType> = ({addItem}) => {
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
            <input value={newTitle} onChange={onChandeHandelr}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    )
}
