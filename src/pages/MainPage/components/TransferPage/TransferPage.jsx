import './TransferPage.css';
import { useState, useRef, useEffect } from 'react';

const TransferPage = (props) => {
    const {
        accountUserCredentials,
        selectedAccount,
        setSelectedAccount,
        // setSelectedReceiver,
        // selectedReceiver,
        setAccTrnsctnHstry,
        setOpenTrnsfrWndw
    } = props;
    const [transferAmount, setTransferAmount] = useState('');
    let [selectedReceiver, setSelectedReceiver] = useState(null)
    const senderSelect = document.querySelector('.sender');
    const receiverSelect = document.querySelector('.receiver');
    const lastClickedSender = useRef(null)
    const trnsctnHstry = JSON.parse(localStorage.getItem('currentLoggedinAccount'))

    useEffect(() => {
        lastClickedSender.current = selectedAccount;
    }, [selectedAccount]);

    const handleKeyPress = (event) => {
        if (event.key === 'e') {
            event.preventDefault();
        }
    };

    // console.log(`ANONG INDEX TO ${clicked}`)
    const handleSelectSender = (index) => {
        const findSender = [index - 1]
        // console.log(`ANONG INDEX KAYA TO ${clicked}`)
        setSelectedAccount(accountUserCredentials[findSender])
        // console.log(`tignan natin si sender ${findSender}`)
    };
    const handleSelectReceiver = (index) => {
        const findReceiver = [index - 1];
        setSelectedReceiver(findReceiver)
        // console.log(`tignan natin si receiver ${findReceiver}`)
    };

    const handleOutsideClick = (event) => {
        const trnsfrWndw = document.querySelector('.transferWindow');
        if (!trnsfrWndw.contains(event.target)) {
            setOpenTrnsfrWndw(false);
        }
    };

    const transferButHit = (event) => {
        event.preventDefault();
        if (!selectedAccount || !selectedReceiver) {
            alert("Please fill up all the fields.");
            return;
        }

        const hideTransferPage = document.querySelector('.transferPage');
        hideTransferPage.style.visibility = "hidden";
        hideTransferPage.style.opacity = "0";
        const senderIndex = senderSelect.selectedIndex;
        const receiverIndex = receiverSelect.selectedIndex;
        const senderName = senderSelect.options[senderIndex].innerText;
        const receiverName = receiverSelect.options[receiverIndex].innerText;
        const amountToTransfer = Number(transferAmount);

        if (senderName === receiverName) {
            alert("Sender and Receiver must not be the same.");
            return;
        }else if(!selectedAccount || !selectedReceiver){
            alert("Please fill up all the fields.")
        }else if (amountToTransfer <= 0 || isNaN(amountToTransfer)) {
            alert("Please enter a valid amount to transfer.");
            return;
        }else if (selectedAccount.initial_balance < amountToTransfer) {
            alert("Insufficient Balance. Please try again.");
            return;
        } else {
            
            lastClickedSender.current = null;
            senderSelect.value = ''
            receiverSelect.value = ''
            setTransferAmount('')
            setSelectedAccount(null)
            transferCalculator(Number(transferAmount))
            setOpenTrnsfrWndw(false)
        }
    };

    const transferCalculator = (transferAmount) => {
        // console.log(updatedBalAfterSend)
        // console.log(updatedBalAfterReceive)
        const prevSenderBal = selectedAccount.initial_balance
        const prevReceiverBal = accountUserCredentials[selectedReceiver].initial_balance
        selectedAccount.initial_balance = selectedAccount.initial_balance - transferAmount
        accountUserCredentials[selectedReceiver].initial_balance = accountUserCredentials[selectedReceiver].initial_balance + transferAmount
        // getNewBalAfterSend(selectedAccount.initial_balance)
        // getNewBalAfterReceive(accountUserCredentials[selectedReceiver].initial_balance)

        const transferHistory = {
        transaction_id: (trnsctnHstry.transaction_history).length + 1,
        transaction_type: 'transfer',
        transaction_date: new Date(),
        amount: transferAmount,
        sender_name: `${selectedAccount.first_name} ${selectedAccount.last_name}`,
        sender_prev_bal: prevSenderBal,
        sender_cur_bal: selectedAccount.initial_balance, 
        receiver_name: `${accountUserCredentials[selectedReceiver].first_name} ${accountUserCredentials[selectedReceiver].last_name}`,
        receiver_prev_bal: prevReceiverBal,
        receiver_cur_bal: accountUserCredentials[selectedReceiver].initial_balance,
        }
        setAccTrnsctnHstry(transferHistory)
    }

    return (
        <div className="transferPage" onClick={handleOutsideClick}>
            <div className="transferWindow" onClick={(e) => e.stopPropagation()}>
                <form className="containerShadow3" >
                    <div className="transferTitle">
                        Transfer Money
                    </div>
                    <div className="transferFieldDisplay">
                        <div className="transferQuestion">
                            How much would you like to send?
                        </div>
                        <div className="transferField">
                            <div className="labelsAndInputsTransfer">
                                <div className="transLabels">
                                    <label> Transfer from:</label>
                                    <label> Transfer to:</label>
                                    <label> Amount to deposit:</label>
                                </div>
                                <div className="transferInputContainer">
                                    <select className="sender" onChange={(e) => {
                                        handleSelectSender(e.target.selectedIndex)
                                        }}
                                        >
                                        <option></option>
                                        {accountUserCredentials.map((account, index) => (
                                            <option key={account.id} value={index}>
                                                {account.first_name} {account.last_name}
                                            </option>
                                        ))}
                                    </select>
                                    <select className="receiver" onChange={(e) => handleSelectReceiver(e.target.selectedIndex)}>
                                        <option></option>
                                        {accountUserCredentials.map((account, index) => (
                                            <option key={account.id} value={index}>
                                                {account.first_name} {account.last_name}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="number"
                                        placeholder="₱"
                                        className="amountToTransfer"
                                        value={transferAmount}
                                        onChange={(e) => 
                                            setTransferAmount(e.target.value)
                                            }
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>
                                <div className = 'availableBalText'><b>Available Balance:</b></div>
                                <i className = 'availableBalNum'>
                                    ₱{(selectedAccount || lastClickedSender.current) ?
                                    (selectedAccount.initial_balance.toLocaleString() ||
                                    lastClickedSender.current.initial_balance.toLocaleString()) :
                                    0}
                                </i>

                        </div>
                    </div>
                    <div className="transferButton">
                        <button onClick={transferButHit} type="submit">Transfer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransferPage;
