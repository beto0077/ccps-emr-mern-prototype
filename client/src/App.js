import {Routes, Route} from "react-router-dom"

import './App.css';
import { GlobalContextProvider } from "./context/GlobalContextProvider";

import UnauthorizedUser from "./components/UnauthorizedUser";
import Home from "./components/Home/Home";
import PatientView from "./components/Patient/PatientView";
import PatientForm from "./components/Patient/PatientForm";
import EquipmentLoanView from "./components/Loans/EquipmentLoanView";
import EquipmentLoanForm from "./components/Loans/EquipmentLoanForm";
import OxygenTankLoanView from "./components/Loans/OxygenTankLoanView";
import OxygenTankLoanForm from "./components/Loans/OxygenTankLoanForm";
import PhysicalTherapyInfoView from "./components/PhysicalTherapyInfo/PhysicalTherapyInfoView";
import PhysicalTherapyInfoForm from "./components/PhysicalTherapyInfo/PhysicalTherapyInfoForm";
import ControlNoteView from "./components/PhysicalTherapyInfo/ControlNoteView";
import ControlNoteForm from "./components/PhysicalTherapyInfo/ControlNoteForm";
import SocialWorkInfo1View from "./components/SocialWorkInfo/SocialWorkInfo1View";
import SocialWorkInfo1Form from "./components/SocialWorkInfo/SocialWorkInfo1Form";
import SocialWorkInfo2View from "./components/SocialWorkInfo/SocialWorkInfo2View";
import SocialWorkInfo2Form from "./components/SocialWorkInfo/SocialWorkInfo2Form";
import SocialWorkInfo3View from "./components/SocialWorkInfo/SocialWorkInfo3View";
import SocialWorkInfo3Form from "./components/SocialWorkInfo/SocialWorkInfo3Form";
import PsychologyInfoView from "./components/PsychologyInfo/PsychologyInfoView";
import PsychologyInfoForm from "./components/PsychologyInfo/PsychologyInfoForm";
import PsychologyInfo2View from "./components/PsychologyInfo/PsychologyInfo2View";
import PsychologyInfo2Form from "./components/PsychologyInfo/PsychologyInfo2Form";
import PsychologyInfo3View from "./components/PsychologyInfo/PsychologyInfo3View";
import PsychologyInfo3Form from "./components/PsychologyInfo/PsychologyInfo3Form";
import InternalReferenceView from "./components/InternalReference/InternalReferenceView";
import InternalReferenceForm from "./components/InternalReference/InternalReferenceForm";
import AttachmentView from "./components/Attachment/AttachmentView";
import AttachmentForm from "./components/Attachment/AttachmentForm";
import UserView from "./components/User/UserView";
import UserForm from "./components/User/UserForm";
import UserLogin from "./components/User/UserLogin";
import UsersList from "./components/User/UsersList";

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
          <Route path="/oxygenTankLoan/:id" element={<OxygenTankLoanView/>}/>
          <Route path="/createOxygenTankLoan" element={<OxygenTankLoanForm/>}/>
          <Route path="/editOxygenTankLoan/:id" element={<OxygenTankLoanForm/>}/>
          <Route path="/physicalTherapyInfo/:id" element={<PhysicalTherapyInfoView/>}/>
          <Route path="/createPhysicalTherapyInfo" element={<PhysicalTherapyInfoForm/>}/>
          <Route path="/editPhysicalTherapyInfo/:id" element={<PhysicalTherapyInfoForm/>}/>
          <Route path="/controlNote/:id" element={<ControlNoteView/>}/>
          <Route path="/createControlNote" element={<ControlNoteForm/>}/>
          <Route path="/editControlNote/:id" element={<ControlNoteForm/>}/>
          <Route path="/socialWorkInfo1/:id" element={<SocialWorkInfo1View/>}/>
          <Route path="/createSocialWorkInfo1" element={<SocialWorkInfo1Form/>}/>
          <Route path="/editSocialWorkInfo1/:id" element={<SocialWorkInfo1Form/>}/>
          <Route path="/socialWorkInfo2/:id" element={<SocialWorkInfo2View/>}/>
          <Route path="/createSocialWorkInfo2" element={<SocialWorkInfo2Form/>}/>
          <Route path="/editSocialWorkInfo2/:id" element={<SocialWorkInfo2Form/>}/>
          <Route path="/socialWorkInfo3/:id" element={<SocialWorkInfo3View/>}/>
          <Route path="/createSocialWorkInfo3" element={<SocialWorkInfo3Form/>}/>
          <Route path="/editSocialWorkInfo3/:id" element={<SocialWorkInfo3Form/>}/>
          <Route path="/psychologyInfo/:id" element={<PsychologyInfoView/>}/>
          <Route path="/createPsychologyInfo" element={<PsychologyInfoForm/>}/>
          <Route path="/editPsychologyInfo/:id" element={<PsychologyInfoForm/>}/>
          <Route path="/psychologyInfo2/:id" element={<PsychologyInfo2View/>}/>
          <Route path="/createPsychologyInfo2" element={<PsychologyInfo2Form/>}/>
          <Route path="/editPsychologyInfo2/:id" element={<PsychologyInfo2Form/>}/>
          <Route path="/psychologyInfo3/:id" element={<PsychologyInfo3View/>}/>
          <Route path="/createPsychologyInfo3" element={<PsychologyInfo3Form/>}/>
          <Route path="/editPsychologyInfo3/:id" element={<PsychologyInfo3Form/>}/>
          <Route path="/internalReference/:id" element={<InternalReferenceView/>}/>
          <Route path="/createInternalReference" element={<InternalReferenceForm/>}/>
          <Route path="/editInternalReference/:id" element={<InternalReferenceForm/>}/>
          <Route path="/attachment/:id" element={<AttachmentView/>}/>
          <Route path="/createAttachment" element={<AttachmentForm/>}/>
          <Route path="/editAttachment/:id" element={<AttachmentForm/>}/>
          <Route path="/userProfile/:id" element={<UserView/>}/>
          <Route path="/createUser" element={<UserForm/>}/>
          <Route path="/editUser/:id" element={<UserForm/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/usersList" element={<UsersList/>}/>
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}
export default App;
