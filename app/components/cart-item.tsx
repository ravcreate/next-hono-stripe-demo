import useCart from "@/utils/use-cart"

export const Item = ({
    title,
    price,
    id,
    totalCost,
    setTotalCost,
}: {
    title: string
    price: number
    id: string
    totalCost: number
    setTotalCost: React.Dispatch<React.SetStateAction<number>>
}) => {
    const cart = useCart()

    const handleClick = () => {
        let total = cart.getTotalCost()
        cart.addOneToCart(id)
        setTotalCost(total)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p>{price}</p>
            <p>{title}</p>
            <button
                className="bg-sky-300 p-2 rounded-md"
                onClick={() => handleClick()}
            >
                Add to Cart
            </button>
        </div>
    )
}
