import express from 'express';
import cors from 'cors';

import { PORT } from './utils/config.js';

import indexRouteTest from './routes/index.routes.js';
import PatientRoutes from './routes/Patient/patient.routes.js';
import EquipmentLoanRoutes from './routes/LoanInfo/equipmentLoan.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRouteTest)
app.use('/patient', PatientRoutes);
app.use('/equipmentLoan', EquipmentLoanRoutes);

app.listen(PORT)
console.log(`Server is running on port ${PORT}`);