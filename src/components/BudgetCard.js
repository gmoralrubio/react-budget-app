import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

// onAddExpenseClick es un evento, se lo pasamos al boton de add expense
export default function BudgetCard({ name, amount, max, gray, onAddExpenseClick, onViewExpensesClick, hideButtons }) {
  const classNames = []
  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if (gray) {
    classNames.push('bg-light')
  }
  return (
    <Card>
      <Card.Body className={classNames.join(' ')}>
        <Card.Title className="d-flex justify-content-between align-itesms-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {/* Si recibe max, se muestra, si no (card uncategorized) no se muestra */}
            {max && (
              <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
            )}
          </div>
        </Card.Title>
        {/* Si recibe max, se muestra, si no (card uncategorized) no se muestra */}
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>Añadir gasto</Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>Ver gastos</Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return 'primary'
  if (ratio < 0.75) return 'warning'
  return 'danger'
}