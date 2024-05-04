import { products } from "@/lib/product-store"

export function getProductData(id: string) {
    /** returns the matching item in an array */
    const productData = products.find((product) => product.id === id)

    if (productData === undefined) {
        console.log("Product does not exist for ID")
        return undefined
    }

    return productData
}
