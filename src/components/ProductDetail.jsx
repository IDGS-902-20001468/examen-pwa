import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBox from './SearchBox';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const imagesContainerStyle = {
    display: "flex",
    justifyContent: "center", 
    flexWrap: "wrap", 
    gap: "10px", 
  };

  const starRatingStyle = {
    color: 'yellow',
  };

  const imageStyle = {
    maxWidth: "150px", 
    height: "auto", 
    borderRadius: "10px", 
  };


  useEffect(() => {
    fetch(`https://api-examen-1275d-default-rtdb.firebaseio.com/products/${id}.json`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mt-3">
      {loading ? (
        <p>Cargando...</p>
      ) : product ? (
        <div>
          <SearchBox />
          <div className='mt-4' style={imagesContainerStyle}>
            {product.images.map((image, index) => (
            <img key={index} src={image} alt={product.title} style={imageStyle} />
        ))}
      </div>
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <p className="card-text">Descuento: {product.discountPercentage}%</p>
              <p className="card-text">
                        Rating: {product.rating}
                        <span style={starRatingStyle}>
                          {'★'.repeat(product.rating)}
                          {'☆'.repeat(5 - product.rating)}
                        </span>
                      </p>
              <p className="card-text">Stock: {product.stock}</p>
              <p className="card-text">Marca: {product.brand}</p>
              <p className="card-text">Categoría: {product.category}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No se encontraron detalles del producto.</p>
      )}
    </div>
  );
};

export default ProductDetail;
