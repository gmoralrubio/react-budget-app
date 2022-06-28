import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

function App() {

  // Controla si se muestra o no el modal de add budget
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  // Controla si se muestra o no el modal de add expense
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

  // Traemos los budgets y lo que necesitemos de BudgetsContext con el hook useBudgets
  const { budgets, getBudgetExpenses } = useBudgets()

  // Controla la apertura del modal de expenses, por id
  // la llamamos desde el boton de anadir expenses
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Presupuestos</h1>
          <Button variant="primary" onClick={ () => setShowAddBudgetModal(true) }>Añadir presupuesto</Button>
          <Button variant="outline-primary" onClick={ openAddExpenseModal }>Añadir gasto</Button>
        </Stack>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}
        >
          {/* Loopeamos por los budgets y los pintamos */}
          {budgets.map(budget => {
            // Cogemos todos los expenses de un budget (budget.id) y devuelve la suma de todos los expenses
            // a reduce le pasamos un total y le sumamos todos los expenses de el budget, inicializa total en 0
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount, 0)
            return ( 
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                // onAddExpenseClick es un evento que le pasamos a BudgetCard como prop con el budgetId que tiene que mostrar por defecto
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
        // Le pasamos un defaultBudgetId
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={ () => setShowAddExpenseModal(false) }/>

      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={ () => setViewExpensesModalBudgetId() }/>
      
    </>
  )
}

export default App;
