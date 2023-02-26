// import React, { useState } from 'react'

// const ThemeContext = React.createContext('theme-ligth')

// export function ThemeProvider({ children }) {
//     const [theme, setTheme] = useState('theme-ligth')

//     function toggleTheme() {
//         setTheme((currentTheme) => (currentTheme === 'theme-ligth' ? 'theme-dark' : 'theme-ligth'))
//     }

//     return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
// }

// export function useTheme() {
//     const context = React.useContext(ThemeContext)

//     if (!context) {
//         throw new Error(`"useTheme"  must be called inside a "ThemeProvider`)
//     }

//     return context
// }
