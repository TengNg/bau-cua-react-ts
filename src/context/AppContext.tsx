import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Alert from "../components/Alert"
import Board from "../components/Board"
import Information from "../components/Information"
import Item from "../components/Item"
import data from "../data/data.json"
import useLocalStorage from "../hooks/useLocalStorage"
import generateRandomItems from "../utils/generateRadomItems"

type AppContextProp = {
    children: ReactNode
}

type Item = {
    id: number,
    name: string,
    selected: boolean,
    betLevel: number
}

type ResultItem = {
    id: number,
    name: string
}

type Alert = {
    show: boolean,
    msg: string,
}

type AppContext = {
    items: Item[]
    resultItems: ResultItem[]
    userMoney: number
    flag: boolean
    counter: number
    handleSelectItem: (id: number) => void
    handleBetLevelChanged: (id: number, value: number) => void
    showAlert: (show: boolean, msg: string) => void
}

const AppContext = createContext({} as AppContext)

export function useAppContext() {
    return useContext(AppContext)
}

const WINNING_MONEY_PER_ITEM = 1000
const WAITING_TIME = 8
const LOCAL_STORAGE_KEY = "localStorage.bauCuaApp"
const STARTING_MONEY = 10_000

const calculateWinningMoney = (resultItems: ResultItem[], selectedItems: Item[]): number => {
    // create tally
    const resultTally = resultItems.reduce((obj: any, item) => {
        obj[item.name] = (obj[item.name] == null) ? 1 : obj[item.name] + 1
        return obj
    }, {})

    const winningMoney = selectedItems.reduce((total, currItem) => {
        const { betLevel } = currItem
        const m = WINNING_MONEY_PER_ITEM * betLevel
        if (resultTally[currItem.name] === undefined) {
            total -= m * 1
        } else {
            total += m * resultTally[currItem.name]
        }
        return total
    }, 0)

    return winningMoney
}

export function AppContextProvider({ children }: AppContextProp) {
    const [items, setItems] = useState<Item[]>(data)
    const [userMoney, setUserMoney] = useLocalStorage<number>(LOCAL_STORAGE_KEY, STARTING_MONEY)
    const [resultItems, setResultItems] = useState<ResultItem[]>([])
    const [alert, setAlert] = useState<Alert>({ show: false, msg: "Please select item" })
    const [flag, setFlag] = useState<boolean>(true)
    const [counter, setCounter] = useState<number>(WAITING_TIME)
    const [intervalId, setIntervalId] = useState<number>(0);

    const selectedItems = items.filter(item => item.selected === true)

    const stopTimer = () => {
        clearInterval(intervalId)
        setCounter(WAITING_TIME)
    }

    const startTimer = () => {
        const id = setInterval(() => {
            setCounter(counter => counter - 1)
        }, 1000)
        setIntervalId(id)
    }

    useEffect(() => {
        let timer: any = null
        if (resultItems.length > 0) {
            setUserMoney(currMoney => currMoney + calculateWinningMoney(resultItems, selectedItems))
            timer = setTimeout(() => {
                setItems(data)
                setResultItems([])
                setFlag(true)
                stopTimer()
            }, 8000)
        }
        return () => clearTimeout(timer)
    }, [resultItems])

    // Reset button onClick
    function handleReset() {
        stopTimer()
        showAlert()
        setFlag(true)
        setItems(data)
        setResultItems([])
    }

    // Roll button onClick
    function handleRoll() {
        if (flag === false) return
        if (selectedItems.length === 0) {
            showAlert(true, 'Please select item')
        } else {
            startTimer()
            setFlag(false)
            showAlert(true, 'Waiting...')
            generateResultItems()
        }
    }

    // Select button onClick
    function handleSelectItem(id: number): void {
        if (flag === false) return
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, selected: !item.selected } : item))
    }

    // input[number] onChange
    function handleBetLevelChanged(id: number, value: number) {
        if (flag === false) return
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, betLevel: value } : item))
    }

    function showAlert(show: boolean = false, msg: string = '') {
        setAlert({ show, msg })
    };

    function generateResultItems() {
        setResultItems(() => generateRandomItems(data))
    }

    return (
        <AppContext.Provider
            value={{
                items,
                handleSelectItem,
                handleBetLevelChanged,
                userMoney,
                resultItems,
                showAlert,
                flag,
                counter
            }}
        >
            {alert.show && <Alert {...alert} />}

            {children}

            <Board />

            <div className='btn-div'>
                <button
                    onClick={() => handleRoll()}
                >Roll</button>
                <button
                    onClick={() => handleReset()}
                >Reset</button>
            </div>

            <Information />

        </AppContext.Provider>
    )
}
