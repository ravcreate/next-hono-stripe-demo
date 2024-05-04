"use client"

import { CartContext } from "@/app/store/cart-context"
import { useContext } from "react"

const useCart = () => {
    return useContext(CartContext)
}
export default useCart
