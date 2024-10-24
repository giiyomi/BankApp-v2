import './WithdrawPage.css';
import { useState } from 'react';

const WithdrawPage = (props) => {
    const {
        accountUserCredentials,
        selectedAccount,
        setAccTrnsctnHstry,
        setOpenWdthrwPg,
    } = props;

    const [withdrawAmount, setWithdrawAmount] = useState('');
    const trnsctnHstry = JSON.parse(localStorage.getItem('currentLoggedinAccount'))

    const handleKeyPress = (event) => {
        if (event.key === 'e') {
            event.preventDefault();
        }
    };

    const WithdButHit = (event) => {
        event.preventDefault();

        const withdrawAmountNumber = Number(withdrawAmount); // Convert the withdraw amount to a number
        const accHolderNameWithdraw = selectedAccount.initial_balance;
        const newBalAfterWithdraw = accHolderNameWithdraw - withdrawAmountNumber;

        if(withdrawAmountNumber <= 0 || isNaN(withdrawAmountNumber)) {
            alert('Please enter a valid amount.');
            return;
        } else if (newBalAfterWithdraw < 0) {
            alert("Insufficient Balance. Please try again.");
            return;
        }

        const withdrawHistory = {
            transaction_id: (trnsctnHstry.transaction_history).length + 1,
            transaction_type: 'withdraw',
            transaction_date: new Date(),
            amount: withdrawAmountNumber,
            account_of: `${selectedAccount.first_name} ${selectedAccount.last_name}`,
            previous_balance: accHolderNameWithdraw,
            current_balance: newBalAfterWithdraw,
        }

        setAccTrnsctnHstry(withdrawHistory)

        selectedAccount.initial_balance = newBalAfterWithdraw;
        setWithdrawAmount('');
        setOpenWdthrwPg(false)
    };

    const handleOutsideDpst = (event) => {
        const withrawWindow = document.querySelector('.withdrawWindow');
        if (!withrawWindow.contains(event.target)) {
            setOpenWdthrwPg(false);
        }
    };

    return (
        <div className="withdrawPage" onClick={handleOutsideDpst}>
            <div className="withdrawWindow" onClick={(e) => e.stopPropagation()}>
                <form className="containerShadow2">
                    <div className="withdrawTitle">Withdraw</div>
                    <div className="withdrawFieldDisplay">
                        <div className="withdrawQuestion">How much would you like to withdraw?</div>
                        <div className="withdrawField">
                            <div className="accHolderNameWithdraw">
                                {selectedAccount ? `${selectedAccount.first_name}'s Account` : "Holder's Account"}
                            </div>
                            <div className="labelsAndInputsWithdraw">
                                <div className="withdrawLabels">
                                    <label>Amount to withdraw:</label>
                                </div>
                                <div className="withdrawInputContainer">
                                    <input
                                        type="number"
                                        placeholder="₱"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className='withdrawInput'
                                    />
                                </div>
                            </div>
                            <span className="personalAvailBalWithd">
                                {selectedAccount ?
                                    `₱ ${selectedAccount.initial_balance === null ? 0 :
                                    selectedAccount.initial_balance.toString().length > 8 ?
                                    selectedAccount.initial_balance.toLocaleString().slice(0, 9) + "..." :
                                    selectedAccount.initial_balance.toLocaleString()}` : 
                                    accountUserCredentials.length !== 0 ?
                                    (() => {
                                        const balance = accountUserCredentials[accountUserCredentials.length - 1].initial_balance;
                                        return `₱ ${balance.toString().length > 7 ? balance.toLocaleString().slice(0, 8) + '...' : balance.toLocaleString()}`;
                                    })() :
                                    <h2 style={{fontSize: '14px', fontStyle: 'italic'}}>Enroll account holder</h2>
                                }
                            </span>
                            <div className="personalBalWithdraw">Personal Balance</div>
                        </div>
                    </div>
                    <div className="withdrawButton">
                        <button type="submit" onClick={WithdButHit}>Withdraw</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawPage;
