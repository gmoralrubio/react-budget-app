import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { IntroAlert } from "./components/IntroAlert";
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()
  const {expenses} = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <h1 className="mx-auto mb-4 text-center">Presupuestos</h1>
        <div className="d-flex justify-content-center">
          <Stack direction="horizontal" gap={2} className="mb-4">
            <Button variant="primary" onClick={ () => setShowAddBudgetModal(true) }>Añadir presupuesto</Button>
            <Button variant="outline-primary" onClick={ openAddExpenseModal }>Añadir gasto</Button>
          </Stack>
        </div>

        {budgets.length === 0 && expenses.length === 0 && (
          <IntroAlert />
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount, 0)
            return ( 
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
            />
          <TotalBudgetCard />
        </div>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={ () => setShowAddBudgetModal(false) }/>

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={ () => setShowAddExpenseModal(false) }/>

      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={ () => setViewExpensesModalBudgetId() }/>
      
    </>
  )
}

export default App;
