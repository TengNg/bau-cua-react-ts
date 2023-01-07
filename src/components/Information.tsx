import { useAppContext } from "../context/AppContext"
import formatCurrency from "../utils/formatCurrency"

export default function Information() {
    const {
        items,
        userMoney,
        resultItems,
        flag,
        counter,
        handleAddMoney
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

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <p style={{ margin: '1rem 0', fontWeight: 'bold' }} className="user-money">Total money: {formatCurrency(userMoney)}</p>
                <button onClick={() => handleAddMoney()} style={{ fontSize: '1em', width: 'fit-content', height: 'fit-content' }}>+</button>
            </div>

            {flag === false && <p style={{ color: 'gray' }}>Waiting: {counter}s. Please check your result</p>}
        </>
    )
}
