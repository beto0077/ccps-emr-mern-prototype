import React from "react";

import { PatientProvider } from "./PatientContext";
import { EquipmentLoanProvider } from "./EquipmentLoanContext";
import { OxygenTankLoanProvider } from "./OxygenTankLoanContext";
import { PhysicalTherapyInfoProvider } from "./PhysicalTherapyInfoContext";
import { ControlNoteProvider } from "./ControlNoteContext";
import { SocialWorkInfo1Provider } from "./SocialWorkInfo1Context";
import { SocialWorkInfo2Provider } from "./SocialWorkInfo2Context";
import { SocialWorkInfo3Provider } from "./SocialWorkInfo3Context";
import { PsychologyInfoProvider } from "./PsychologyInfoContext";
import { PsychologyInfo2Provider } from "./PsychologyInfo2Context";
import { PsychologyInfo3Provider } from "./PsychologyInfo3Context";
import { InternalReferenceProvider } from "./InternalReferenceContext";
import { AttachmentProvider } from "./AttachmentContext";
import { UserProvider } from "./UserContext";

/*export const GlobalContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <AttachmentProvider>
        <OxygenTankLoanProvider>
          <EquipmentLoanProvider>
            <PatientProvider>{children}</PatientProvider>
          </EquipmentLoanProvider>
        </OxygenTankLoanProvider>
      </AttachmentProvider>
    </UserProvider>
  );
};*/
export const GlobalContextProvider = ({ children }) => {
  return (
    <UserProvider>
    <PatientProvider>
      <AttachmentProvider>
        <EquipmentLoanProvider>
          <OxygenTankLoanProvider>
            <PhysicalTherapyInfoProvider>
              <ControlNoteProvider>
                <SocialWorkInfo1Provider>
                  <SocialWorkInfo2Provider>
                    <SocialWorkInfo3Provider>
                      <PsychologyInfoProvider>
                        <PsychologyInfo2Provider>
                          <PsychologyInfo3Provider>
                            <InternalReferenceProvider>
                              {children}
                            </InternalReferenceProvider>
                          </PsychologyInfo3Provider>
                        </PsychologyInfo2Provider>
                      </PsychologyInfoProvider>
                    </SocialWorkInfo3Provider>
                  </SocialWorkInfo2Provider>
                </SocialWorkInfo1Provider>
              </ControlNoteProvider>
            </PhysicalTherapyInfoProvider>
          </OxygenTankLoanProvider>
        </EquipmentLoanProvider>
      </AttachmentProvider>
    </PatientProvider>
  </UserProvider>
  );
};