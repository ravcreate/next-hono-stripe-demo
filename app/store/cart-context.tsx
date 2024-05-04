"use client"

import { createContext, useState } from "react"
import { products } from "@/lib/product-store"
import { ProductType } from "@/schemas"
import { getProductData } from "@/utils/get-product-data"

// Context ( cart, addToCart, removeCart)
// Provider ->gives your React app access to all the things in your coWtext

interface ContextProps {
    items: ProductType[]
    addOneToCart: (id: string) => void
    getProductQuantity: (id: string) => void
    removeOneFromCart: (id: string) => void
    deleteFromCart: (id: string) => void
    getTotalCost: () => number
}

export const CartContext = createContext<ContextProps>({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => 0,
})

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}): React.ReactElement => {
    const [cartProducts, setCartProducts] = useState<ProductType[]>([])

    function getProductQuantity(id: string) {
        const quantity = cartProducts.find(
            (product) => product.id === id
        )?.quantity

        if (quantity === undefined) {
            return 0
        }

        return quantity
    }

    function addOneToCart(id: string) {
        const quantity = getProductQuantity(id)
        if (quantity === 0) {
            setCartProducts([
                // @ts-ignore
                ...cartProducts,
                // @ts-ignore
                {
                    id: id,
                    quantity: 1,
                },
            ])
        } else {
            setCartProducts(
                cartProducts.map((product) => {
                    return product.id === id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                })
            )
        }
    }

    function deleteFromCart(id: string) {
        setCartProducts((cartProducts) =>
            cartProducts.filter((currentProduct) => {
                return currentProduct.id != id
            })
        )
    }

    function removeOneFromCart(id: string) {
        const quantity = getProductQuantity(id)
        if (quantity === 1) {
            deleteFromCart(id)
        } else {
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantiy: product.quantity - 1 }
                        : product
                )
            )
        }
    }

    function getTotalCost(): number {
        let totalCost = 0
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id)
            totalCost += productData!.price * cartItem.quantity
        })
        totalCost = Number(totalCost.toFixed(2))
        return totalCost
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        // @ts-ignore
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
