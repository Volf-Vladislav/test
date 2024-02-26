import Product from "../types/Product"
import BrandCount from "../types/BrandCount"

import DropNames from "../enums/DropNames"

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

export const sortByKey = <Product>(array: Product[], key: keyof Product): Array<Product> => {
    if (array.length !== 0) {
        const sorted = array.slice().sort((a, b) => {
            const valueA = a[key]
            const valueB = b[key]

            if (valueA < valueB) {
                return -1
            }
            if (valueA > valueB) {
                return 1
            }
            return 0
        })

        if (sorted) {
            console.log(sorted)
            return sorted
        }
    }
    return []
}


export const sortBy = (items: Product[], selectedItem: string): Array<Product> => {
    if (selectedItem === DropNames.first) {
        return items.sort((a, b) => a.price - b.price)
    } else if (selectedItem === DropNames.second) {
        return items.sort((a, b) => b.price - a.price)
    } else if (selectedItem === DropNames.third) {
        const normalizedArray = items.filter(item => item.brand !== null);
        return sortByKey(normalizedArray, 'brand')
    } else if (selectedItem === DropNames.fourth) {
        return sortByKey(items, 'product')
    } else {
        return items
    }
}