import { AddItemForm } from "./AddItemForm";
import { action } from '@storybook/addon-actions'


export default {
    title:'Add item form component',
    component:AddItemForm
}

const callback = action('Button "Add" was pressed inside the form')

export const AddItemFormBaseExample = ()=> {
    return <AddItemForm addItem={callback}/>
}