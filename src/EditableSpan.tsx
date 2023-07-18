import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

type editableSpanType = {
    title: string
    onChange: (newTitle: string) => void

}

export const EditableSpan: React.FC<editableSpanType> = ({ title, onChange }) => {
    let [newTitle, setNewTitle] = useState(title)
    let [editMode, setEditMode] = useState(false)

    let editModeON = () => {
        setEditMode(true)
        setNewTitle(title)
    }
    let editModeOFF = () => {
        setEditMode(false)
        onChange(newTitle)
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { editModeOFF() }
    }
    return (
        editMode
            ? <input value={newTitle} onKeyDown={onKeyDownHandler} onBlur={editModeOFF} autoFocus onChange={onChangeHandler} />
            : <span onDoubleClick={editModeON}>{title}</span>
    )
}
