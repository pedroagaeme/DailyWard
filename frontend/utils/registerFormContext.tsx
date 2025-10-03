import { createContext, useContext, useState } from "react";
import { RegisterFormData } from "@/constants/FormTypes";

const RegisterFormContext = createContext<{getFormData?: () => RegisterFormData, updateFormData?: (data: RegisterFormData) => void }>({});

export const useRegisterForm = () => {return useContext(RegisterFormContext)};

export const RegisterFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [formData, setFormData] = useState<RegisterFormData>({});

    const updateFormData = (newData: RegisterFormData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <RegisterFormContext.Provider value={{getFormData: () => formData, updateFormData}}>
            {children}
        </RegisterFormContext.Provider>
    );
};