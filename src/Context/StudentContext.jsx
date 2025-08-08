import { createContext, useState } from "react";
import mockStudents from "@/data/Students"

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(mockStudents);

  const addStudent = (newStudent) => {
    setStudents(prev => [...prev, { id: Date.now(), ...newStudent }]);
  };

  return (
    <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
