
const Card = ({ item }) => {
  const formatedTitle = item.title.slice(0, 20)
  const precentageDrop = ((item.price_strikethrough - item.price) / item.price_strikethrough * 100).toFixed(0)

  return (
    <div className='card'>
      <div className="img-container">
        <img src={item.url_image} alt={item.title} className=""/>
      </div>
      <div className="text-container">
        <h5 className="">{formatedTitle}...</h5>
        <p>
          Price drop from ${item.price} to ${item.price_strikethrough}
        </p>
        <p className="">
          Rating: {item.rating}
        </p>
      </div>
      <div className="info-container">
        <div className="circle">
          {precentageDrop}%
        </div>
        <a href={`https://www.amazon.com/${item.url}`} className="">Go!</a>
      </div>

    </div>
  )
}

export default Card