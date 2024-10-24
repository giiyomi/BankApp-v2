import "./DepositPage.css";
import { useState } from 'react';

const DepositPage = (props) => {
    const {
        accountUserCredentials,
        selectedAccount,
        setAccTrnsctnHstry,
        setOpenDpstPg
    } = props;
    
    const [depositAmount, setDepositAmount] = useState('');
    const trnsctnHstry = JSON.parse(localStorage.getItem('currentLoggedinAccount'))

    const handleKeyPress = (event) => {
        if (event.key === 'e') {
            event.preventDefault();
        }
    };

    const DepButHit = (event) => {
        event.preventDefault();
        const displayDepositPage = document.querySelector('.depositPage');

        const accHolderNameDeposit = Number(selectedAccount.initial_balance);
        const depositAmountNumber = Number(depositAmount);
        const newBalAfterDeposit = accHolderNameDeposit + depositAmountNumber;

        if (depositAmountNumber <= 0 || isNaN(depositAmountNumber)) {
            alert('Please enter a valid amount');
            return;
        }

        const depositHistory = {
            transaction_id: (trnsctnHstry.transaction_history).length + 1,
            transaction_type: 'deposit',
            transaction_date: new Date(),
            amount: depositAmountNumber,
            account_of: `${selectedAccount.first_name} ${selectedAccount.last_name}`,
            previous_balance: accHolderNameDeposit,
            current_balance: newBalAfterDeposit,
        }

        setAccTrnsctnHstry(depositHistory)
        selectedAccount.initial_balance = newBalAfterDeposit
        displayDepositPage.style.visibility = "hidden";
        displayDepositPage.style.opacity = "0";
        setDepositAmount('');
        setOpenDpstPg(false)
    };

    const handleOutsideDpst = (event) => {
        const depositWindow = document.querySelector('.depositWindow');
        if (!depositWindow.contains(event.target)) {
            setOpenDpstPg(false);
        }
    };

    return (
        <div className="depositPage" onClick={handleOutsideDpst}>
            <div className="depositWindow" onClick={(e) => e.stopPropagation()}>
                <form className="edgeShadow">
                    <div className="depositTitle">
                        Deposit
                    </div>
                    <div className="depositFieldDisplay">
                        <div className="depositQuestion">
                            How much would you like to deposit?
                        </div>
                        <div className="depositField">
                            <div className="accHolderNameDeposit">
                                {selectedAccount ? `${selectedAccount.first_name}'s Account` : "Holder's Account"}
                            </div>
                            <div className="labelsAndInputs">
                                <div className="depositLabels">
                                    <label> Amount to Deposit:</label>
                                </div>
                                <div className="depositInputContainer">
                                    <input
                                        type="number"
                                        placeholder="₱"
                                        value={depositAmount}
                                        onChange={(e) =>
                                            setDepositAmount(e.target.value)
                                        }
                                        className="depositInput"
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>
                            <span className="personalAvailBalDep">
                                {selectedAccount ?
                                    `₱ ${selectedAccount.initial_balance === null ? 0 :
                                        selectedAccount.initial_balance.toString().length > 8 ?
                                            selectedAccount.initial_balance.toLocaleString().slice(0, 9) + "..." :
                                            selectedAccount.initial_balance.toLocaleString()
                                    }` :
                                    accountUserCredentials.length !== 0 ? (() => {
                                        const balance = accountUserCredentials[accountUserCredentials.length - 1].initial_balance;
                                        return `₱ ${balance.toString().length > 7 ? balance.toLocaleString().slice(0, 8) + '...' : balance.toLocaleString()}`;
                                    })() : <h2 style={{ fontSize: '14px', fontStyle: 'italic' }}>Enroll account holder</h2>
                                }
                            </span>
                            <div className="personalBalDeposit">Personal Balance</div>
                        </div>
                    </div>
                    <div className="depositButton">
                        <button onClick={DepButHit}> Deposit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DepositPage;
