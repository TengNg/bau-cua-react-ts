import { useEffect, useState } from "react";

function getStoredValue<T>(key: string, initialValue: T | (() => T)) {
    const storedValue = JSON.parse(localStorage.getItem(key) as string)
    if (storedValue) return storedValue
    return (typeof initialValue === 'function') ? initialValue as (() => T) : initialValue
}

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => getStoredValue(key, initialValue))
    useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value])
    return [value, setValue] as const
}
