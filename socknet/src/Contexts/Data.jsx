import { createContext } from 'react';

const Data = createContext();


export const DataProvider = ({children}) => {

    const dalykas = 'dalykas';

    return (
        <Data.Provider value={{
            dalykas
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;