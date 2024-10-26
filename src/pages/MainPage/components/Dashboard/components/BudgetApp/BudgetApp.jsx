
import './BudgetApp.css'; 
import { useState,  useEffect } from 'react';
// import { format } from 'date-fns';
import AddExpense from '../../../AddExpns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import expenseData from '../../../../../../assets/data/expense-list.json'
import { dateFormatter } from '../../../../../../helper/converter';

function BudgetApp(props) {
    const {setNewCredentials, findUserArray} = props 
    const [hideLeftSideBar, setHideLeftSideBar] = useState(true)
    const [expenses, setExpenses] = useState(expenseData);
    const [totalExp, setTotalExp] = useState(0)
    const [remainingBdgt, setRemainingBdgt] = useState(0)
    const [selectedDate, setSelectedDate] = useState(null);
    const [budgetAmnt, setBudgetAmnt] = useState()
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [currentLoggedinAccount, setCurrentLoggedinAccount] = useState(() => JSON.parse(localStorage.getItem('currentLoggedinAccount')));
    const userName = localStorage.getItem('currentUserNameLoggedin')


    useEffect(()=>{
        const total = findUserArray.budget_details.expenses.reduce((acc, expense) => acc + expense.expense_cost, 0);
        setTotalExp(total);
        setRemainingBdgt(findUserArray.budget_details.budget_amount - parseFloat(total));
        setCurrentLoggedinAccount(findUserArray);
        setExpenses(findUserArray.budget_details.expenses)
    },[findUserArray])

    const handleBlur = (e) => {
        const removedCrrncySignFromBdgt = budgetAmnt?.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        const removedCrrncySign = e.target.value?.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');

        setNewCredentials(prevCred => 
            prevCred.map(user => 
                user.user_name === userName ?
                    { ...user, 
                        budget_details: { 
                            ...user.budget_details, 
                            budget_amount: parseFloat(removedCrrncySignFromBdgt || removedCrrncySign) 
                        }
                    } :
                user
            )
        );  
    };

    const handleDateBlur = (date) => {
    // Update the new credentials with the selected date
            setNewCredentials(prevCred => 
                prevCred.map(user => 
                    user.user_name === userName ?
                        { ...user, 
                        budget_details: { 
                            ...user.budget_details, 
                            budget_period: date
                        }
                    } : 
                user
            )
        );

    };

    const handleBudgetInput = (e) => {
        const inputValue = e.target.value;
        let valueWithoutSymbol = inputValue.replace(/[₱,]/g, "").trim();
        const regex = /^\d*\.?\d{0,2}$/;
    
        if (regex.test(valueWithoutSymbol)) {
            const [wholePart, decimalPart] = valueWithoutSymbol.split(".");
    
            const formattedWholePart = Number(wholePart).toLocaleString('en');
            const formattedValue = decimalPart !== undefined
                ? `${formattedWholePart}.${decimalPart}`
                : formattedWholePart;

            setBudgetAmnt("₱ " + formattedValue);
        }
    };

    const handleExpenses = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setNewCredentials(prevCred => 
            prevCred.map(user => 
                user.user_name === userName ? {
                    ...user,
                    budget_details: {
                        ...user.budget_details,
                        expenses: [...user.budget_details.expenses || [], newExpense] // Safely append new expense to budget details
                    }
                } : user
            )
        );
    };
    
    const handleDeleteExpense = (expenseId) => {
        // Update the local state by filtering out the deleted expense
        const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
        setExpenses(updatedExpenses);

        setNewCredentials(prevCred => 
            prevCred.map(user => 
                user.user_name === userName ? {
                    ...user,
                    budget_details: {
                        ...user.budget_details,
                        expenses: updatedExpenses
                    }
                } : user
            )
        );
        
    };
    

    return (
        <div className='viewBudgetApp'>
            <AddExpense
                handleExpenses={handleExpenses}
                newId={currentLoggedinAccount.budget_details.expenses.length}
                setHideLeftSideBar={setHideLeftSideBar}
                hideLeftSideBar={hideLeftSideBar}
            />

            <div className='budgetApp'>
               
                <h4 className='expnsTtlContainer'>
                    <div className='leftSideBarIcon'
                        onClick={()=>{setHideLeftSideBar(false)}}
                    >
                    <i class="bi bi-layout-sidebar-inset"/>
                    </div>
                    Expenses
                </h4>
                <div className='expnsWndwContainer'>
                    {
                        expenses.map((expense) => {
                            return (
                            <div className='expenseItems' key={expense.id}>
                                <div className='expenseInfo'>
                                    <div className='expenseInfoRight'>
                                        <span>Name: {expense.expense_name} </span>
                                        <span>Cost: ₱ {(expense.expense_cost).toLocaleString('en')}</span>
                                    </div>
                                    <div className='expenseInfoLeft'>
                                        <span>Due: {dateFormatter(expense.expense_due)}</span>
                                        <span>Note: {expense.exp_note}</span>
                                    </div>
                                </div>
                                <div className='dlteExpButtnsContainer'>
                                    <button className='deleteExpenseButtons' onClick={() => handleDeleteExpense(expense.id)}>
                                    <i className="fa-solid fa-x"></i>
                                    </button>
                                </div>


                            </div>
                            );
                        })
                    }
                </div>
                
                <div className='setBudgtVsTotalExp'>

                    <div className="setBudgetContainer">
                        <form className="setBdgtAmntForm">
                            <div className="bdgtInptsprLine">
                                <h4>BUDGET AMOUNT</h4>
                                <input
                                    placeholder={
                                        currentLoggedinAccount.budget_details.budget_amount? 
                                        `₱ ${(currentLoggedinAccount.budget_details.budget_amount).toLocaleString()}` :
                                        "Set Budget"
                                    }
                                    type="text"
                                    value={isInputFocused ?
                                        budgetAmnt :
                                        (currentLoggedinAccount.budget_details.budget_amount? 
                                        `₱ ${(currentLoggedinAccount.budget_details.budget_amount).toLocaleString()}` :
                                        ""
                                    )
                                    }
                                    onChange={handleBudgetInput}
                                    onFocus={()=> setIsInputFocused(true)}
                                    onBlur={handleBlur}
                                    onKeyPress={(e) => {
                                        const charCode = e.charCode;
                                        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                            e.preventDefault();
                                        }

                                        if (charCode === 13) {
                                            handleBlur(e);
                                            e.target.blur(); 
                                        }
                                    }}
                                />
                            </div>
                            <div className="bdgtInptsprLine">
                                <h4>UNTIL</h4>
                                <DatePicker
                                    selected={selectedDate? selectedDate :
                                        currentLoggedinAccount.budget_details.budget_period
                                    }
                                    onChange={(date) => {
                                        setSelectedDate(date)
                                        handleDateBlur(date);  
                                    }}
                                    minDate={new Date()} 
                                    placeholderText="Select date"
                                    dateFormat="MMMM d, yyyy" 
                                />
                            </div>
                            
                        </form>
                    </div>

                    <div className='ExpAndRemainingBdgt'>
                            <div className='totlExpCntainr'>

                                <h4>Total Expense</h4>
                                <div>{`₱ ${totalExp.toLocaleString()}`}</div>
                            </div>
                            <div className='bdgtAftrExpCntainr'>
                                <h4>Remaining Budget</h4>
                                <div>{`₱ ${remainingBdgt.toLocaleString()}`} {remainingBdgt < 0 && (<span className='shortIndicator'> (short) </span>)}</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default BudgetApp;
