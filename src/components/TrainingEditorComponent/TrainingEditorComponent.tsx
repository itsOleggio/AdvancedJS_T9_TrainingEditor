import { AddForm } from "./components/AddForm/AddForm"
import { TableInfo } from "./components/TableInfo/TableInfo"

export function TrainingEditorComponent(){
    return(
        <div className="container">
            <AddForm/>
            <TableInfo/>
        </div>
    )
}