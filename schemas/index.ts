interface Product {
    id: string
    price: number
    name: string
    quantity: number
}
export type { Product as ProductType }

interface LineItem {
    id: string
    quantity: number
}
export type { LineItem as LineItemType }

interface StripeLineItem {
    price: string
    quantity: number
}
export type { StripeLineItem as StripeLineItemType }

interface SessionObject {
    items: LineItem[]
}
export type { SessionObject as SessionObjectType }
