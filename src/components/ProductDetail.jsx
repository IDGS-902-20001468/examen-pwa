import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBox from './SearchBox';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="container">
      {loading ? (
        <p>Cargando...</p>
      ) : product ? (
        <div>
          <SearchBox />
          <div className="card m-3 p-2"> 
          <div className="card-title">
          <h2>Detalles del producto</h2>
          </div>
          <div className="row">
             <div className="col-md-6">
                <img src={product.thumbnail} className="card-img-top img-fluid" alt={product.title} />
             </div>
             <div className="col-md-6">
             <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <p className="card-text">Descuento: {product.discountPercentage}%</p>
              <p className="card-text">Rating: {product.rating}</p>
              <p className="card-text">Stock: {product.stock}</p>
              <p className="card-text">Marca: {product.brand}</p>
              <p className="card-text">Categoría: {product.category}</p>
            </div>
             </div>
          </div>
          <div className="d-flex justify-content-center m-3">
                    <button className="btn btn-info" onClick={(() => { alert('Compra realizada')})}>Comprar Producto</button>
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
