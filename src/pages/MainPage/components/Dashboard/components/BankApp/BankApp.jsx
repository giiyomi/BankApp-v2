import './BankApp.css'
import goldChip from '../../../../../../assets/images/goldchip.png'
import AvionBankLogo from '../../../../../../assets/images/avionbank_logo2.png';

export default function BankApp(props) {
    const {
        accountUserCredentials,
        selectedAccount,
        totalBalance,
        setOpenUsrRegWndw,
        setOpenAccHolders,
        // openChooseAcc,
        // openTransferWindow,
        // openHistoryWindow,
        // handleLogout
    } = props
    const currentLoggedinAccount = JSON.parse(localStorage.getItem('currentLoggedinAccount'))

    const onMouseViewUsers = () => {
        const onMouseViewUsers = document.querySelector('.viewAccHolderToolTip');
            onMouseViewUsers.style.opacity = "1";
            onMouseViewUsers.style.transition = "1s";
    }

    const offMouseViewUsers = () => {
        const offMouseViewUsers = document.querySelector('.viewAccHolderToolTip');
            offMouseViewUsers.style.opacity = "0"
            offMouseViewUsers.style.transition = "0s";
    }

    const handleLogout = () => {
        alert("You are logging out.");
        localStorage.removeItem('currentUserNameLoggedin');
        window.location.href = '/loginPage';
    };
    return (
        <div className='viewBankApp'>
            <div className='adbtDiv'>
                <button className='logoutButton' onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket" id="logout"></i>
                </button>
                <button className='adminButton' onClick={() => setOpenUsrRegWndw(true)}>
                    <i className="fa-solid fa-user-gear" id="addUser"></i>
                </button>
            </div>
            <div className='userInfo'>
                <div className='accountManager'>
                    <h6>Account Manager:</h6>
                    <span>
                        {currentLoggedinAccount.first_name} {currentLoggedinAccount.last_name}
                    </span>
                </div>
                <div className='accountUser'>
                    <h6>Account Holder:</h6>
                    <span>
                        <div className="automaticDisplay">
                            {selectedAccount
                                ? `${selectedAccount.first_name} ${selectedAccount.last_name}`
                                : (accountUserCredentials.length !== 0 &&
                                    `${accountUserCredentials[accountUserCredentials.length - 1].first_name}
                                    ${accountUserCredentials[accountUserCredentials.length - 1].last_name}`)}
                        </div>
                    </span>
                </div>
            </div>
            <div className='cardHolderContainer'>
                <div className='userDetail3'>
                    <div className='displayBalance'>
                        <div className='personalBalance'>
                            <i class="fa-solid fa-ellipsis"
                                onMouseEnter={onMouseViewUsers}
                                onMouseLeave={offMouseViewUsers}
                                onClick={() => setOpenAccHolders(true)}
                                id="viewAccountHolder">
                            </i>
                            <div className='viewAccHolderToolTip'>
                                View Account Holders
                            </div>
                            <h2>
                                {selectedAccount
                                    ? `₱ ${selectedAccount.initial_balance === null ? 0
                                        : selectedAccount.initial_balance.toString().length > 8
                                            ? selectedAccount.initial_balance.toLocaleString().slice(0, 9) + "..."
                                            : selectedAccount.initial_balance.toLocaleString()}`
                                    : accountUserCredentials.length !== 0
                                        ? (() => {
                                            const balance = accountUserCredentials[accountUserCredentials.length - 1].initial_balance;
                                            return `₱ ${balance.toString().length > 7
                                                ? balance.toLocaleString().slice(0, 8) + '...'
                                                : balance.toLocaleString()}`;
                                        })()
                                        : <h2 style={{ fontSize: '14px', fontStyle: 'italic' }}>Enroll account holder</h2>
                                }
                            </h2>
                        </div>
                        <div className='overallBalance'>
                            <h6> Total Balance</h6>
                            <h6>{`₱${totalBalance.toString().length > 10 ? totalBalance.toLocaleString().slice(0, 10) + '...' : totalBalance.toLocaleString()}`}</h6>
                        </div>
                    </div>
                    <div className='cardDesign'>
                        <div className='avionBankLogo'>
                            <img src={AvionBankLogo} alt="AvionBank_logo" />
                        </div>
                        <div className='goldChip'>
                            <img src={goldChip} alt="gold_chip" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}