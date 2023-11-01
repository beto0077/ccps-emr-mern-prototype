import React from "react";

/*import { SuperAdminProvider } from "./SuperAdminContext";
import { DoctorProvider } from "./DoctorContext";

import { AdminProvider } from "./AdminContext";*/
import { PatientProvider } from "./PatientContext";
import { EquipmentLoanProvider } from "./EquipmentLoanContext";
//Oxygen...
//PhysicalTherapy...
//ControlNote
//User
//SocialWork3
//InternalReference
//Attachment
//PsychologyInfo2
//PsychologyInfo3

export const GlobalContextProvider = ({ children }) => {
  return (
    <EquipmentLoanProvider>
      <PatientProvider>{children}</PatientProvider>
    </EquipmentLoanProvider>
  );
};
