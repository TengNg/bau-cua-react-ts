import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import { AppContextProvider } from './context/AppContext'

function App() {
    return (
        <AppContextProvider>
            <h2>Bau Cua</h2>
        </AppContextProvider>
    )
}

export default App
