import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddBudgetModal({ show, handleClose }) {

  // Se usan en los inputs
  // Crean referencias a los valores de los inputs que podemos usar
  const nameRef = useRef()
  const maxRef = useRef()

  // Para llamaar a addBudget, debemos usar el hook useBudgets() que hemos creado en el BudgetsContext
  const { addBudget } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    // llamamos a la funcion addBudget que viene del BudgetContext, y le pasamos los valores en un objeto
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo presupuesto</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control ref={nameRef} type="text" required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Gasto máximo</Form.Label>
            <Form.Control ref={maxRef} type="number" min={0} step={0.01} required/>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Añadir</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
