import './HistoryPage.css';
import { capitalizer, groupTransactionsByDate, getDateLabel } from '../../../../helper/converter';

const HistoryPage = (props) => {
    const {accountUserCredentials, setOpenTrnsHstry} = props;
    const trnsctnHstry = JSON.parse(localStorage.getItem('currentLoggedinAccount'));
    const groupedTransactions = groupTransactionsByDate(trnsctnHstry.transaction_history);

    // console.log(trnsctnHstry);

    const totalBalance = accountUserCredentials.reduce((total, account) => {
        const balance = account.initial_balance;
        return total + balance;
    }, 0);

    const handleOutsideClick = (event) => {
        const historyWindow = document.querySelector('.historyWindow');
        if (!historyWindow.contains(event.target)) {
            setOpenTrnsHstry(false);
        }
    };

    return (
        <div className="historyPage" onClick={handleOutsideClick}>
            <div className="historyWindow" onClick={(e) => e.stopPropagation()}>
                <form className="historyContainerShadow2">
                    <div className="historyTitle">
                        History
                    </div>
                    <div className="historyFieldDisplay">
                        <div className="transactionHistory">
                            Transaction(s)
                        </div>
                        <div className='transactionsContainer'>
                        {Object.keys(groupedTransactions)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map(date => (
                            <div key={date} className='trnsctionPerDate'>
                                <div className='dateHolder'><h4>{date}</h4> <h6>({getDateLabel(date)})</h6></div>
                                {groupedTransactions[date]
                                    .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)) // Sort transactions by date
                                    .map(transaction => (
                                        <div className='transactionList' key={transaction.transaction_id}>
                                            {(transaction.transaction_type === 'deposit' ||  transaction.transaction_type === 'withdraw') && 
                                                <div className='trnsctnHolder'>
                                                    <h4>
                                                        <i className='trnsctnHighlight'>
                                                            {capitalizer(transaction.transaction_type)}
                                                            <div>({transaction.account_of})</div>
                                                        </i>
                                                        <i className='trnsctnHighlight'>
                                                            ₱ {(transaction.amount).toLocaleString()}
                                                        </i>
                                                    </h4>
                                                    <div className='trnsctnDetails'>
                                                        <div className='rightSideTrns'>
                                                            <h6>Previous Bal:</h6>
                                                            <div>₱ {(transaction.previous_balance).toLocaleString()}</div>
                                                        </div>

                                                        <h3>→</h3>
                                                        <div className='leftSideTrns'>
                                                            <h6>Current Bal:</h6>
                                                            <div>₱ {(transaction.current_balance).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {/* {transaction.transaction_type === 'withdraw' && 
                                                <div className='trnsctnHolder'>
                                                    <h4>
                                                        <i className='trnsctnHighlight'>
                                                            {capitalizer(transaction.transaction_type)}
                                                            <div>({transaction.account_of})</div>
                                                        </i>
                                                        <i className='trnsctnHighlight'>₱ {(transaction.amount).toLocaleString()} </i>
                                                    </h4>
                                                    <div className='trnsctnDetails'>
                                                        <div className='rightSideTrns'>
                                                            <h6>Previous Bal:</h6>
                                                            <div>₱ {(transaction.previous_balance).toLocaleString()}</div>
                                                        </div>

                                                        <h3>→</h3>
                                                        <div className='leftSideTrns'>
                                                            <h6>Current Bal:</h6>
                                                            <div>₱ {(transaction.current_balance).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            } */}
                                            {transaction.transaction_type === 'transfer' && 
                                                <div className='trnsctnHolder'>
                                                    <h4>
                                                        <i className='trnsctnHighlight'>
                                                            {capitalizer(transaction.transaction_type)}
                                                        </i>
                                                        <i className='trnsctnHighlight'>
                                                            ₱ {(transaction.amount).toLocaleString()}
                                                        </i>
                                                    </h4>
                                                    <div className='trnsctnDetails'>
                                                        <div className='rightSideTrns'>
                                                            <h6>From:</h6>
                                                            <div>{transaction.sender_name}</div>
                                                        </div>

                                                        <h3>→</h3>
                                                        <div className='leftSideTrns'>
                                                            <h6>To:</h6>
                                                            <div>{transaction.receiver_name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                            </div>
                        ))}
                        </div>
                        <div>
                            <b>Total Balance:</b> {`₱${totalBalance.toString().length > 10 ? totalBalance.toLocaleString().slice(0, 10) + '...' : totalBalance.toLocaleString()}`}
                        </div>

                    </div>
                    <div className="historyButton">
                        <button onClick={() => setOpenTrnsHstry(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HistoryPage;
