import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBoxIndex = () => {
  const [filtro, setFiltro] = useState('');
  const [error, setError] = useState(''); // Variable de estado para el mensaje de error
  const navigate = useNavigate();

  const handleSearch = () => {
    if (filtro.trim() === '') {
      setError('Por favor, ingrese un término de búsqueda.'); // Establece el mensaje de error
    } else {
      setError(''); // Limpia el mensaje de error si el campo no está vacío
      navigate(`/buscar/${filtro}`);
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex flex-column align-items-center">
        <img src="https://i.pinimg.com/originals/ac/b0/0a/acb00a75596396868d555bbd836ab79c.png" alt="" height="300" />
        <h1 className="text-center">Bazar Online</h1>
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Ingrese un término de búsqueda"
        />
        <button
          className="btn btn-info"
          type="button"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBoxIndex;
