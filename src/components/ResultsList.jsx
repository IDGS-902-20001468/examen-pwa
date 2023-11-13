import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

const ResultsList = () => {
  const { filtro } = useParams();
  console.log(filtro);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api-examen-1275d-default-rtdb.firebaseio.com/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error obteniendo productos:', error);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) => {
        return (
          typeof filtro === 'string' &&
          typeof product.title === 'string' &&
          product.title.toLowerCase().includes(filtro.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    }
  }, [filtro, products]);

  const starRatingStyle = {
    color: 'yellow',
  };

  const handleProductDetail = (productId) => {
    navigate(`/detalle/${productId}`);
  };

  return (
    <div className="container mt-3">
      <SearchBox />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="m-3 p-2">
          {filtro ? ( // Verifica si el filtro no es nulo
            <h2>Se encontraron {filteredProducts.length} resultados para: {filtro}</h2>
          ) : (
            <h2>No se ha ingresado un filtro</h2>
          )}
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4">
                  <div className="card mb-3">
                    <img
                      src={product.thumbnail}
                      className="card-img-top"
                      alt={product.title}
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p
                        className="card-text"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.description}
                      </p>
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
                      <button
                        onClick={() => handleProductDetail(product.id)}
                        className="btn btn-info"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ResultsList;
