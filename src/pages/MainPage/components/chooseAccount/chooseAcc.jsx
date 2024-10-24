import './chooseAcc.css'
import '../../../../assets/images/401kBalanceCompare_EmployerMatch.gif'


const ChooseAccount = (props) => {
    const {
        accountUserCredentials,
        setSelectedAccount,
        depositOrWidthdraw,
        setOpenChooseAcc,
        setOpenDpstPg,
        setOpenWdthrwPg
    } = props;

    const handleSelectSet = (index) => {
        const findAccHolder = accountUserCredentials[index]; //ni re-assign ko lang kay findAccHolder
        setSelectedAccount(findAccHolder);
        setOpenChooseAcc(false)

        if (depositOrWidthdraw === 'Withdraw') {
            setOpenWdthrwPg(true);
        } else if (depositOrWidthdraw === 'Deposit') {
            setOpenDpstPg(true); // Dapat palitan mo ang pangalan ng function na tatawagin dito
        }
    };
    
    const totalBalance = accountUserCredentials.reduce((total, account) => {
        const balance = account.initial_balance;
        return total + balance;;
    }, 0);

    const handleOutsideClick = (event) => {
        const dpstPg = document.querySelector('.chooseAccWindow');
        if (!dpstPg.contains(event.target)) {
            setOpenChooseAcc(false);
        }
    };
    
    return (
        <div class="chooseAccPage" onClick={handleOutsideClick}>
            <div class="chooseAccWindow">
                <form class="edgeShadow">
                    <div class="chooseAccTitle">
                        Choose Account
                    </div>
                    <div class="accHolderList">
                        <div class="headerTitles">
                            <div>Full Name</div> 
                            <div>Balance</div> 
                            <div>Email</div> 
                        </div>
                        <div className='accountsContainer'>
                            {accountUserCredentials.map((account, index) => (
                                <div key={account.id} class="namesAndBalances" onClick={(event) => {
                                    handleSelectSet(index)}}>
                                    <div>{account.first_name} {account.last_name}</div>
                                    <div>{`₱${account.initial_balance.toLocaleString()}`}</div>
                                    <div>{account.email}</div>
                                </div>
                            ))}
                        </div>
                        <div className='sumTotalBalance'><strong>Total:</strong> ₱{totalBalance.toString().length > 12 ? `${totalBalance.toLocaleString().slice(0, 12)}, ...` : totalBalance.toLocaleString()}</div>
                    </div>
                    <div class="closeAccHolderWindow">
                        <button onClick={() => setOpenChooseAcc(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChooseAccount;
