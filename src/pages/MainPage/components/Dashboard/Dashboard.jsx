import {useState} from 'react'
import './Dashboard.css';
import BankApp from './components/BankApp/BankApp'
import BudgetApp from './components/BudgetApp/BudgetApp';



function Dashboard(props){
    const {
        setNewCredentials,
        accountUserCredentials,
        selectedAccount,
        buttonHolder,
        setOpenUsrRegWndw,
        setOpenAccHolders,
        setOpenTrnsHstry,
        setOpenTrnsfrWndw,
        setOpenChooseAcc,
        findUserArray
    } = props

    const [activeApp, setActiveApp] = useState('bankApp')

    const totalBalance = accountUserCredentials.reduce((total, account) => {
        const balance = account.initial_balance;
        return total + balance;
    }, 0);

    const openChooseAcc = (e) => {
        let clickedButton = null;
        setOpenChooseAcc(true)
        if (e.target.closest(".Deposit")) {
            clickedButton = "Deposit"
            buttonHolder(clickedButton)
            } else if(e.target.closest(".Withdraw")){
            clickedButton = "Withdraw"
            buttonHolder(clickedButton)
        }
    }

    return (
        <div className='mainContainer' >
            <div className='contentContainer'>
                <h1 className='containerTitle'>Dashboard</h1>
                <div className='appCategoryContainer'>
                    <div className={activeApp === 'bankApp' ? 'activeApp' : null} onClick={()=>setActiveApp('bankApp')}> Bank App </div>
                    <div  className={activeApp === 'budgetApp' ? 'activeApp' : null} onClick={()=>setActiveApp('budgetApp')}> Budget App </div>
                </div>
                <div className={`dashBoardContentContainer ${activeApp === 'budgetApp' ? 'fullHeight' : ''}`}>

                    {activeApp === 'bankApp' &&
                        <BankApp
                            accountUserCredentials={accountUserCredentials}
                            selectedAccount={selectedAccount}
                            totalBalance={totalBalance}
                            setOpenUsrRegWndw={setOpenUsrRegWndw}
                            setOpenAccHolders={setOpenAccHolders}
                        />
                    }

                    {activeApp === 'budgetApp' &&
                        <BudgetApp
                            setNewCredentials={setNewCredentials}
                            findUserArray={findUserArray}
                        />
                    }
                    
                </div>
                <div className='btDiv'>
                    <button className='Withdraw buttons' onClick={openChooseAcc}>Widthdraw</button>
                    <button className='Deposit buttons' onClick={openChooseAcc}>Deposit</button>
                    <button className='Transfer buttons' onClick={() => setOpenTrnsfrWndw(true)}>Transfer</button>
                    <button className='History buttons' onClick={()=>setOpenTrnsHstry(true)}>History</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;