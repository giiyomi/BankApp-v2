import { useState } from "react";
import './AddExpns.css';

function AddExpense(props){
    const {handleExpenses, newId, hideLeftSideBar, setHideLeftSideBar} = props;
    const [expenseName, setExpense] = useState('');
    const [expenseCost, setExpenseCost] = useState(null);
    const [expDueDate, setExpDueDate] = useState(null)
    const [expAddDtails, setExpAddDtails] = useState('')

    const addExpenseHandler = (event) => {
        event.preventDefault();

        const newExpenseObject = {
            id: newId,
            expense_name: expenseName,
            expense_cost: parseFloat(expenseCost),
            expense_due: Date(expDueDate),
            exp_note: expAddDtails
        }
        handleExpenses(newExpenseObject);

        // setExpen('');
        // setExpenseCost('');
    }

    return (
        <div  className={`setBdgtAndExpnse ${hideLeftSideBar? 'hidden' : 'showing'}`} >
            <div className="hideLeftSideBarIcon" onClick={() => {setHideLeftSideBar(true)}}>
                <i class="bi bi-arrow-left-circle-fill"></i>
            </div>


            <div className="setExpenseContainer">
                <h3 className="setExpnsTtle">Set Expense</h3>
                <form onSubmit={addExpenseHandler} className="addExpenseForm">
                    <div className="expenseFormInputs">

                        <input
                            input='text'
                            value={expenseName}
                            placeholder="Expense name"
                            onChange={(event) => setExpense(event.target.value)} required
                        />

                        <input
                            type="number"
                            value={expenseCost}
                            placeholder="Expense cost "
                            onChange={(event) => setExpenseCost(event.target.value)}
                            required min={0}
                            step="0.01"
                            onKeyDown={(event) => ["e","E", "-"].includes(event.key) && event.preventDefault()}
                        />

                        <input
                            type="date"
                            value={expDueDate}
                            onChange={(event) => setExpDueDate(event.target.value)}
                            onKeyDown={(event) => ["e","E", "-"].includes(event.key) && event.preventDefault()}
                            min={new Date().toISOString().split("T")[0]}
                        />

                        <textarea
                            className="expnsXtraDetails"
                            onChange={e=>{setExpAddDtails(e.target.value)}}
                        />


                    </div>
                    <div className="addExpenseBtnContainer">
                        <button className="addExpenseButton">Add</button>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default AddExpense;