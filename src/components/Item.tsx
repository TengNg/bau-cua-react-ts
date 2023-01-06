import { useAppContext } from "../context/AppContext"

type ItemProp = {
    id: number,
    name: string,
    selected: boolean,
    betLevel: number
}

export default function Item({ id, name, selected, betLevel }: ItemProp) {
    const {
        handleSelectItem,
        handleBetLevelChanged,
    } = useAppContext()

    return (
        <>
            <div
                className="item"
                style={{ background: selected ? 'green' : 'grey' }}
            >
                <span>{name}</span>
                <input
                    type='number' value={betLevel} min="1" max="5"
                    style={{ width: "2rem", textAlign: "center" }}
                    onChange={(e) => handleBetLevelChanged(id, +e.target.value)}
                />
                <button onClick={() => handleSelectItem(id)}>Select</button>
            </div>
        </>
    )
}
