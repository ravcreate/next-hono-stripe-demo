"use client"

import { useState, useEffect } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { Modal } from "./components/modal"
import { products } from "@/lib/product-store"
import CartProvider from "./store/cart-context"
import { ShoppingCart } from "./components/shopping-cart"
import { Item } from "./components/cart-item"
import useCart from "@/utils/use-cart"

export default function Home() {
    const cart = useCart()
    const [showModal, setShowModal] = useState(false)
    const [totalCost, setTotalCost] = useState(0)

    const onClick = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }

    return (
        <CartProvider>
            <div>
                <nav className="flex justify-end w-full">
                    <button
                        className="flex items-center justify-center w-[40px] h-[40px] border border-white  rounded-sm m-8"
                        onClick={() => onClick()}
                    >
                        <FaShoppingCart />
                    </button>
                </nav>
                <main>
                    <div className="flex flex-row justify-center gap-10">
                        {products.map((item) => (
                            <Item
                                id={item.id}
                                title={item.title}
                                key={item.id}
                                price={item.price}
                                totalCost={totalCost}
                                setTotalCost={setTotalCost}
                            />
                        ))}
                    </div>
                </main>
                <Modal showModal={showModal} setShowModal={setShowModal}>
                    <ShoppingCart />
                </Modal>
            </div>
        </CartProvider>
    )
}
