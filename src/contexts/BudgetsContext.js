import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage";

// Crea el context
const BudgetsContext = React.createContext()

// constante para los expenses que no estan dentro de ningun budget
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

// Custom hook que permite usar el context
export function useBudgets() {
  return useContext(BudgetsContext)
}

// BudgetsProvider wraps App
  // Todo lo que este dentro del BudgetsProvider estara disponible en App
export const BudgetsProvider = ({ children }) => {
  // Pasamos un valor (value={{}}) y todos los children del context tienen acceso
  // Como value le pasamos todo lo que la app va a necesitar
  // Como el BudgetProvider envuelve toda la App, esta accesible para toda la App

  // inicializamos y creamos los valores que usa el BudgetsContext.Provider
  const [budgets, setBudgets] = useLocalStorage('budgets', []) // iniciliza el custom hook useLocalStorage, pasandole key, value
  const [expenses, setExpenses] = useLocalStorage('expenses', []) 

  // Estructura budget que se almacena en el state
  // {
  //   id:
  //   name:
  //   max:
  // }
  // Estructura expenses
  // {
  //   id:
  //   budgetId:
  //   amount:
  //   description:
  // }

  // definimos las funciones que usaran el state
  function getBudgetExpenses(budgetId) {
    // Devuelve de los expenses, el expense con el budgetId igual al que le pasamos
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }

  function addBudget({ name, max }) {
    // Coge todos los budgets (prevBudgets) y los devuelve anadiendo uno con un id unico y los valores que le pasamos
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets // si ya existe un budget con el mismo nombre almacenado en el state, devuelve los budgets que hay sin anadirlo
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }

  // Elimina por id
  function deleteBudget({ id }) {
    // cuando borramos un budget, los expenses de ese budget se mueven a uncategorized
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        // si no es el budget id correcto, devuelve el expense tal cual
        if (expense.budgetId !== id) return expense
        // devuelve el expense, modificando el busgetId para que sea uncategorized
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })
    // almacena en el state todos los budgets excepto el que tiene el id que le pasamos
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }

  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense
    }}>
      {children}
    </BudgetsContext.Provider>
  )
}