"use client"

import useCart from "@/utils/use-cart"
import { getProductData } from "@/utils/get-product-data"
import { checkout } from "@/utils/check-out"

export const ShoppingCart = () => {
    const cart = useCart()
    const totalCost = cart.getTotalCost()

    const handleClick = () => {
        checkout({ items: cart.items })
    }

    return (
        <div className="relative flex w-full h-full items-center justify-center text-black  ">
            <div className="relative flex flex-col w-[400px] h-[600px] bg-white  z-0 justify-start gap-20 rounded-lg items-center p-20">
                <p className="relative h-fit w-fit ">Shopping Cart</p>
                <div className="flex flex-col items-center justify-center gap-2">
                    {!cart.items && <p>Cart is empy.</p>}
                    {cart.items.map((item) => (
                        <Items key={item.id} item={item} />
                    ))}
                </div>
                <div>
                    <p>Total Cost: ${totalCost}</p>
                </div>
                <button
                    className="p-4 rounded bg-blue-400"
                    onClick={() => handleClick()}
                >
                    Buy Now
                </button>
            </div>
        </div>
    )
}

const Items = (item: any) => {
    const cart = useCart()
    const cartItem = item.item
    const product = getProductData(item.item.id)
    const price = product?.price
    const totalCost = price! * cartItem.quantity

    return (
        <div className="flex w-[300px] flex-row text-black justify-between">
            <div>{product?.title}</div>
            <div>{cartItem.quantity}</div>
            <div>${totalCost.toFixed(2)}</div>
        </div>
    )
}
