import { useAppContext } from "../context/AppContext"
import formatCurrency from "../utils/formatCurrency"

export default function Information() {
    const {
        items,
        userMoney,
        resultItems
    } = useAppContext()

    const selectedItems = items.filter(item => item.selected === true)

    return (
        <>
            <div className="selected-items-div">
                {selectedItems.map(item => {
                    return <p key={item.id}>{item.name}(x{item.betLevel})</p>
                })}
            </div>

            <div className="result-div">
                {resultItems.map((item, index) => {
                    return <p key={index}>{item.name}</p>
                })}
            </div>

            <p className="user-money">Total {formatCurrency(userMoney)}</p>
        </>
    )
}
