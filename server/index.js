import express from 'express';
import cors from 'cors';

import { PORT } from './utils/config.js';

import indexRouteTest from './routes/index.routes.js';
import PatientRoutes from './routes/Patient/patient.routes.js';
import EquipmentLoanRoutes from './routes/LoanInfo/equipmentLoan.routes.js'
import OxygenTankLoanRoutes from './routes/LoanInfo/oxygenTankLoan.routes.js';
import UserRoutes from './routes/User/user.routes.js'
import SocialWorkInfo1Routes from './routes/SocialWorkInfo/socialWorkInfo1.routes.js'
import SocialWorkInfo2Routes from './routes/SocialWorkInfo/socialWorkInfo2.routes.js'
import SocialWorkInfo3Routes from './routes/SocialWorkInfo/socialWorkInfo3.routes.js'
import InternalReferenceRoutes from './routes/InternalReferencesInfo/internalReference.routes.js'
import AttachmentRoutes from './routes/Attachment/attachment.routes.js'
import PhysicalTherapyInfoRoutes from './routes/PhysicalTherapyInfo/physicalTherapyInfo.routes.js'
import ControlNoteRoutes from './routes/PhysicalTherapyInfo/controlNote.routes.js'
import PsychologyInfoRoutes from './routes/PsychologyInfo/psychologyInfo.routes.js'
import PsychologyInfo2Routes from './routes/PsychologyInfo/psychologyInfo2.routes.js'
import PsychologyInfo3Routes from './routes/PsychologyInfo/psychologyInfo3.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRouteTest);
app.use('/user', UserRoutes);
app.use('/patient', PatientRoutes);
app.use('/equipmentLoan', EquipmentLoanRoutes);
app.use('/oxygenTankLoan', OxygenTankLoanRoutes);
app.use('/socialWorkInfo3', SocialWorkInfo3Routes);
app.use('/internalReference', InternalReferenceRoutes);
app.use('/attachment', AttachmentRoutes);
app.use('/physicalTherapyInfo', PhysicalTherapyInfoRoutes);
app.use('/controlNote', ControlNoteRoutes);
app.use('/psychologyInfo', PsychologyInfoRoutes);
app.use('/psychologyInfo2', PsychologyInfo2Routes);
app.use('/psychologyInfo3', PsychologyInfo3Routes);

app.listen(PORT)
console.log(`Server is running on port ${PORT}`);