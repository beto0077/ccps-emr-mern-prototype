import { createContext, useContext, useState } from 'react';

import { 
    getOxygenTankLoansRequest,
    createOxygenTankLoanRequest,
    deleteOxygenTankLoanRequest,
    getOxygenTankLoanRequest,
    updateOxygenTankLoanRequest } from '../api/oxygenTankLoan.api.js';

const OxygenTankLoanContext = createContext();

export const useOxygenTankLoanContext = () => {
    const context = useContext(OxygenTankLoanContext);
    if (context === undefined) {
        throw new Error("useOxygenTankLoanContext must be used within an OxygenTankLoanProvider");
    }

    return context;
}

export const OxygenTankLoanProvider = ({ children }) => {
    const [oxygenTankLoans, setOxygenTankLoans] = useState([]);

    async function loadOxygenTankLoans(id) {
        const response = await getOxygenTankLoansRequest(id);
        setOxygenTankLoans(response.data);
    }

    const deleteOxygenTankLoan = async (id) => {
        try {
            const response = await deleteOxygenTankLoanRequest(id);
            setOxygenTankLoans(oxygenTankLoans.filter((loan) => loan.oxygen_loan_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createOxygenTankLoan = async (loan) => {
        try {
            await createOxygenTankLoanRequest(loan);
        } catch (error) {
            console.log(error);
        }
    }

    const getOxygenTankLoan = async (id) => {
        try {
            const response = await getOxygenTankLoanRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateOxygenTankLoan = async (id, newFields) => {
        try {
            const response = await updateOxygenTankLoanRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <OxygenTankLoanContext.Provider 
            value={{
                oxygenTankLoans,
                loadOxygenTankLoans,
                deleteOxygenTankLoan,
                createOxygenTankLoan,
                getOxygenTankLoan,
                updateOxygenTankLoan
            }}
        >
            {children}
        </OxygenTankLoanContext.Provider>
    );
}