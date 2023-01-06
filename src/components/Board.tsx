import { useAppContext } from "../context/AppContext"
import Item from "./Item"

export default function Board() {
    const {
        items
    } = useAppContext()

    return (
        <>
            <div className="board">
                {items.map(item => {
                    return <Item key={item.id} {...item} />
                })}
            </div>
        </>
    )
}
