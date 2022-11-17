import { Budget } from ".prisma/client"
import BudgetList from "../../Views/BudgetList/BudgetList"
import CreateBudget from "../../Views/CreateBudget/CreateBudget"

type HomeHocProps = {
    budgets: Budget[]
}

BudgetList

const HomeHoc : React.FunctionComponent<HomeHocProps> = ({budgets}) => {
    if (budgets.length > 0) return <BudgetList budgets={budgets} />
    return <CreateBudget heading="Create New Budget" />
}

export default HomeHoc