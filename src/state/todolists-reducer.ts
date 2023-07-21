import { v1 } from "uuid";
import { filterType, todolistsType } from "../App";

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: filterType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState:todolistsType[] = [
    { id: todolistId1, title: 'new tottolist', filter: 'all' },
    { id: todolistId2, title: 'old totdolist', filter: 'all' },
]

export const todolistsReducer = (state: todolistsType[] = initialState, action: ActionType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return (
                state.filter(tl => tl.id !== action.id)
            )
        }
        case 'ADD-TODOLIST': {
            return (
                [{ id: action.todolistId, title: action.title, filter: 'all' }, ...state]
            )
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolists = state.find(tl => tl.id === action.id)
            if (todolists) {
                todolists.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolists = state.find(tl => tl.id === action.id)
            if (todolists) {
                todolists.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const RemooveTodolistAC = (id: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1() }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title }
}
export const ChangeTodolistFilterAC = (id: string, filter: filterType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter }
}