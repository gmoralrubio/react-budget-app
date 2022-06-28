import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {

  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

  // Si el budgetId es uncategorized, creamos un nuevo budget sin categoria
  // si no, buscamos ese budget entre los que traemos del BudgetsContext
  const budget = UNCATEGORIZED_BUDGET_ID === budgetId
    ? { name: 'Varios', id: UNCATEGORIZED_BUDGET_ID }
    : budgets.find( b => b.id === budgetId)

  // Traemos los expenses del budget
  const expenses = getBudgetExpenses(budgetId)

  // El modal se muestra si el budgetId existe
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Gastos - {budget?.name}</div> {/* budget?.name -> si el budget tiene name lo pinta, si no lo omite */} 
            {/* si el budget id no es uncategorized, lo pinta (no podemos borrar el budget uncategorized) */}
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button onClick={() => {
                deleteBudget(budget)
                handleClose()
              }} variant="outline-danger">Borrar presupuesto</Button>
            )}
          </Stack>
        </Modal.Title>  
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map(expense => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
              <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
