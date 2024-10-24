import "./MainPage.css"
import { useState } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import AvionbankLogo from '../components/AvionbankLogo/AvionbankLogo'
import ContactUs from '../components/ContactUs/ContactUs'
import EnrollUser from './components/enrollUser/enrollUser'
import AccHolders from './components/AccHolders/AccHolders'
import ChooseAccount from './components/chooseAccount/chooseAcc'
import DepositPage from './components/DepositPage/DepositPage'
import WithdrawPage from './components/WithdrawPage/WithdrawPage'
import TransferPage from './components/TransferPage/TransferPage'
import HistoryPage from './components/HistoryPage/HistoryPage'

const MainPage = (props) => {
  const {
    findUserArray,
    userName,
    setAccUserId,
    accountUserCredentials,
    setNewCredentials
  } = props

  let [selectedAccount, setSelectedAccount] = useState(null);
  const [depositOrWidthdraw, buttonHolder] = useState("");
  const [openUsrRegWndw, setOpenUsrRegWndw] = useState(false)
  const [openAccHolders, setOpenAccHolders] = useState(false)
  const [openTrnsHstry, setOpenTrnsHstry] = useState(false)
  const [openTrnsfrWndw, setOpenTrnsfrWndw] = useState(false)
  const [openChooseAcc, setOpenChooseAcc] = useState(false)
  const [openDpstPg, setOpenDpstPg] = useState(false)
  const [openWdthrwPg, setOpenWdthrwPg] = useState(false)
  !userName && (window.location.href = '/loginpage')

  const setAccTrnsctnHstry = (newHistory) => {
    setNewCredentials((prevCredentials) => {
      if (!Array.isArray(prevCredentials)) {
        return [newHistory]; // Return as an array if it's not
      }
      return prevCredentials.map((credential)=>{
        if (credential.user_name === userName) {
        const history = Array.isArray(credential.transaction_history) ? credential.transaction_history : [];
        return { ...credential, transaction_history: [...history, newHistory] };
        }
        return credential;
      })
    })
  }

  return (
    <div className='mainPage'>
      <AvionbankLogo></AvionbankLogo>
      <Dashboard
        setNewCredentials={setNewCredentials}
        findUserArray={findUserArray}
        accountUserCredentials={accountUserCredentials} // Pinasa dito yung buong array ng mga Account Holders
        selectedAccount={selectedAccount}
        buttonHolder = {buttonHolder}
        setOpenUsrRegWndw={setOpenUsrRegWndw}
        setOpenAccHolders={setOpenAccHolders}
        setOpenTrnsHstry={setOpenTrnsHstry}
        setOpenTrnsfrWndw={setOpenTrnsfrWndw}
        setOpenChooseAcc={setOpenChooseAcc}
      /> 

      {openUsrRegWndw &&
        <EnrollUser
          setAccUserId={setAccUserId} // Pinasa dito yung # of arrays ng Account Holders
          accountUserCredentials={accountUserCredentials} // Pinasa dito yung buong array ng Account Holders
          setOpenUsrRegWndw={setOpenUsrRegWndw}
          setNewCredentials={setNewCredentials}
        />
      }

      {openAccHolders &&
        <AccHolders
          accountUserCredentials={accountUserCredentials} // Pinasa dito yung buong array ng Account Holders
          setSelectedAccount={setSelectedAccount}
          setOpenAccHolders={setOpenAccHolders}
        />
      }

      {openChooseAcc &&
        <ChooseAccount
          accountUserCredentials={accountUserCredentials} // Pinasa dito yung buong array ng Account Holders
          setSelectedAccount = {setSelectedAccount}
          depositOrWidthdraw = {depositOrWidthdraw}
          setOpenChooseAcc={setOpenChooseAcc}
          setOpenDpstPg = {setOpenDpstPg}
          setOpenWdthrwPg={setOpenWdthrwPg}
        />
      }

      {openDpstPg &&
        <DepositPage
          accountUserCredentials={accountUserCredentials}
          selectedAccount={selectedAccount}
          setAccTrnsctnHstry={setAccTrnsctnHstry}
          setOpenDpstPg={setOpenDpstPg}
        />
      }

      {openWdthrwPg && 
        <WithdrawPage
          accountUserCredentials={accountUserCredentials}
          selectedAccount={selectedAccount}
          setAccTrnsctnHstry={setAccTrnsctnHstry}
          setOpenWdthrwPg={setOpenWdthrwPg}
        />
      }
      
      {openTrnsfrWndw &&
        <TransferPage
          accountUserCredentials={accountUserCredentials}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          setAccTrnsctnHstry={setAccTrnsctnHstry}
          setOpenTrnsfrWndw={setOpenTrnsfrWndw}
        />
      }

      {/* <SendMoney/> */}
      {openTrnsHstry &&
        <HistoryPage
          accountUserCredentials={accountUserCredentials}
          setAccTrnsctnHstry={setAccTrnsctnHstry}
          setOpenTrnsHstry={setOpenTrnsHstry}
        />
      }
      
      <ContactUs></ContactUs>
    </div>
  )
}
export default MainPage;
