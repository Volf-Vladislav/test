import Product from '../../types/Product'

const Card = (props: Product) => {
  const { id, product, brand, price } = props

  const Russian = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  })

  const brandNormalize = (brand: string) => {
    return brand ? brand : 'Нет информации'
  }

  return (
    <div className='card' id={id}>
      <div className='name'>{product}</div>
      <div className='brand'>бренд {brandNormalize(brand)}</div>
      <div className='price'>цена {Russian.format(price)}</div>
    </div>
  )
}

export default Card
