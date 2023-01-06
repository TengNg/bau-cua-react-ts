import { useEffect } from "react"
import { useAppContext } from "../context/AppContext"

type AlertProps = {
    msg: string
}

export default function Alert({ msg }: AlertProps) {
    const {
        showAlert
    } = useAppContext()

    useEffect(() => {
        const id = setTimeout(() => {
            showAlert(false, 'Please select item')
        }, 500)
        return () => clearTimeout(id)
    })

    return (
        <>
            <div className="alert">{msg}</div>
        </>
    )
}
