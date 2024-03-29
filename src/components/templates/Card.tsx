import Product from '../../types/Product'

const Card = (props: Product) => {
  const { id, product, brand, price } = props

  const Russian = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  })

  return (
    <div className='card' id={id}>
      <div className='image'></div>
      <div className='info'>
        <div className='name'>{product}</div>
        <div className='brand'>{brand || 'нет бренда'}</div>
        <div className='price'>{Russian.format(price)}</div>
      </div>
    </div>
  )
}

export default Card
