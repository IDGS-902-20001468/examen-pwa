import { BrowserRouter, Routes, Route } from "react-router-dom"
// import SearchBox from './components/SearchBox';
import ResultsList from './components/ResultsList';
import ProductDetail from './components/ProductDetail';
import SearchBoxIndex from "./components/SearchBoxIndex";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<SearchBoxIndex/>}/>
      <Route path="/buscar/:filtro" element={<ResultsList/>}/>
      <Route path="/detalle/:id" element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;



