import { v1 } from "uuid";
import { filterType, todolistsType } from "../App";

type ActionType = RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType
export type RemoveTodolistActionType = {
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type:'ADD-TODOLIST'
    title:string
}
export type ChangeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
export type ChangeTodolistFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER'
    id:string
    filter:filterType
}

export const todolistsReducer = (state: todolistsType[], action: ActionType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return (
                state.filter(tl => tl.id !== action.id)
            )
        }
        case 'ADD-TODOLIST': {
            return (
                [{id:v1(),title:action.title,filter:'all'},...state]
            )
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolists = state.find(tl=>tl.id===action.id)
                if(todolists) {
                    todolists.title=action.title
                }
                return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolists = state.find(tl=>tl.id===action.id)
                if(todolists) {
                    todolists.filter=action.filter
                }
                return [...state]
        }
        default:
            throw new Error('wtf ???')
    }
}

export const RemooveTodolistAC = (id:string): RemoveTodolistActionType => {
    return{type:'REMOVE-TODOLIST',id}
}
export const AddTodolistAC = (title:string): AddTodolistActionType => {
    return{type:'ADD-TODOLIST',title}
}
export const ChangeTodolistTitleAC = (id:string,title:string): ChangeTodolistTitleActionType => {
    return{type:'CHANGE-TODOLIST-TITLE',id,title}
}
export const ChangeTodolistFilterAC = (id:string,filter:filterType): ChangeTodolistFilterActionType => {
    return{type:'CHANGE-TODOLIST-FILTER',id,filter}
}