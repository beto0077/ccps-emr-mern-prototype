import {Routes, Route} from "react-router-dom"

import './App.css';
import { GlobalContextProvider } from "./context/GlobalContextProvider";

import UnauthorizedUser from "./components/UnauthorizedUser";
import Home from "./components/Home/Home";
import PatientView from "./components/Patient/PatientView";
import PatientForm from "./components/Patient/PatientForm";
import EquipmentLoanView from "./components/Loans/EquipmentLoanView";
import EquipmentLoanForm from "./components/Loans/EquipmentLoanForm";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/unauthorized" element={<UnauthorizedUser/>}/>
          <Route path="/patientProfile/:id" element={<PatientView/>}/>
          <Route path="/createPatient" element={<PatientForm/>}/>
          <Route path="/editPatient/:id" element={<PatientForm/>}/>
          <Route path="/equipmentLoan/:id" element={<EquipmentLoanView/>}/>
          <Route path="/createEquipmentLoan" element={<EquipmentLoanForm/>}/>
          <Route path="/editEquipmentLoan/:id" element={<EquipmentLoanForm/>}/>
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}
export default App;
