import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"

// Los expenses se pueden asignar a un budget via id, por eso necesitamos un defaultBudgetID
export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {

  // Se usan en los inputs
  // Crean referencias a los valores de los inputs que podemos usar
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()

  // Traemos lo que necesitamos del BudgetsContext via useBudgets hook
  const { addExpense, budgets } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    // llamamos a la funcion addBudget que viene del BudgetContext, y le pasamos los valores en un objeto
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo gasto</Modal.Title>  
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control ref={amountRef} type="number" min={0} step={0.01} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Presupuesto</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef} >
              {/* Option para los expenses sin categoria */}
              <option id={UNCATEGORIZED_BUDGET_ID}>Varios</option>
              {budgets.map(budget =>(
                // Por cada budget, creamos un option
                <option key={budget.id} value={budget.id}>{budget.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Añadir</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
