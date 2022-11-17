import { Budget } from ".prisma/client"
import Link from 'next/link'
import React from "react"

type BudgetListProps = {
    budgets: Budget[]
}

const BudgetList : React.FunctionComponent<BudgetListProps> = ({budgets}) => {
    return <>
        <h3>Your Budgets</h3>
        <ul>
            { budgets.map( budget => (
                <li>
                    <Link href={`/budget/${budget.id}`}>{budget.identifier}</Link>
                </li>
            ))}
        </ul>
    </>
}

export default BudgetList;