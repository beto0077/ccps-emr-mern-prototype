import { createContext, useContext, useState } from 'react';

import { 
    getLoansRequest,
    createLoanRequest,
    deleteLoanRequest,
    getLoanRequest,
    updateLoanRequest } from '../api/equipmentLoan.api.js';

const EquipmentLoanContext = createContext();

export const useEquipmentLoanContext = () => {
    const context = useContext(EquipmentLoanContext);
    if (context === undefined) {
        throw new Error("useEquipmentLoanContext must be used within an EquipmentLoanProvider");
    }

    return context;
}

export const EquipmentLoanProvider = ({ children }) => {
    const [loans, setLoans] = useState([]);

    async function loadLoans(id) {
        const response = await getLoansRequest(id);
        setLoans(response.data);
    }

    const deleteLoan = async (id) => {
        try {
            const response = await deleteLoanRequest(id);
            setLoans(loans.filter((loan) => loan.loan_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createLoan = async (loan) => {
        try {
            await createLoanRequest(loan);
        } catch (error) {
            console.log(error);
        }
    }

    const getLoan = async (id) => {
        try {
            const response = await getLoanRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateLoan = async (id, newFields) => {
        try {
            const response = await updateLoanRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EquipmentLoanContext.Provider 
            value={{
                loans,
                loadLoans,
                deleteLoan,
                createLoan,
                getLoan,
                updateLoan
            }}
        >
            {children}
        </EquipmentLoanContext.Provider>
    );
}
