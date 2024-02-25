import Product from "../types/Product"

export const removeDuplicates = (array: Array<Product>, prop: keyof Product) => {
    return array.filter((element: Product, pos: number, array: Array<Product>) => {
        return array.map((item: Product) => item[prop]).indexOf(element[prop]) === pos
    })
}