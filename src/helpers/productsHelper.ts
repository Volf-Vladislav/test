import Product from "../types/Product"
import BrandCount from "../types/BrandCount"

export const removeDuplicates = (array: Array<Product>, prop: keyof Product) => {
    return array.filter((element: Product, pos: number, array: Array<Product>) => {
        return array.map((item: Product) => item[prop]).indexOf(element[prop]) === pos
    })
}

export const removeSame = (array: string[]): string[] => {
    return [...new Set(array)]
}

export const countBrandRepeats = (brands: (string | null)[]): BrandCount[] => {
    const brandCounts: { [brand: string]: number } = {}

    for (const brand of brands) {
        if (brand !== null) {
            if (brandCounts[brand]) {
                brandCounts[brand]++
            } else {
                brandCounts[brand] = 1
            }
        }
    }

    const result: BrandCount[] = Object.entries(brandCounts).map(([name, repeats]) => ({
        name,
        repeats,
    }))

    return result
}