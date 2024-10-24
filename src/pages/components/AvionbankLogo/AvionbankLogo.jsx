import './AvionbankLogo.css'
import Avionbanklogo from "../../../assets/images/avionbank_logo2.png"


function AvionbankLogo(){
    return (
        <div className="avionbankLogo">
            <img src={Avionbanklogo} alt="Avion Bank logo"></img>
        </div>
    )
}

export default AvionbankLogo;