import React from "react"
import './CreateBudget.css'


type CreateBudgetProps = {
    heading: string
}

const CreateBudget : React.FunctionComponent<CreateBudgetProps> = ({heading}) => {
    return <>
        <form method="POST" action="/api/budget" className="oba-form-container">
            <h3>{ heading }</h3>
            <input name="identifier" id="identifier" type="text" placeholder="Budget Name..."/>
            <select name="paycycle_type" id="paycycle_type" placeholder="Paycycle Type..." defaultValue="BIWEEKLY">
                <option value="WEEKLY">Weekly</option>
                <option value="BIWEEKLY">Fortnightly</option>
                <option value="MONTHLY">Monthly</option>
            </select>
            <button type="submit">Create New Budget</button>
        </form>
    </>
}

export default CreateBudget;