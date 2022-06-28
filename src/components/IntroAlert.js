import { Alert, Button } from "react-bootstrap";
import { useState } from "react";

export function IntroAlert() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="warning">
        <Alert.Heading className="text-center">Ya puedes empezar a registrar tus gastos</Alert.Heading>
        <p className="text-center">
          Con esta app puedes crear presupuestos y añadir gastos a tus presupuestos, para tener un control sobre lo que gastas. Haz click en <strong>"Añadir presupuesto"</strong>y asigna tus gastos a ese presupuesto o simplemente añade gastos con el botón <strong>"Añadir gasto"</strong>.
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => setShow(false)} variant="primary">
            Entendido!
          </Button>
        </div>
      </Alert>
    </>
  );
}