import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api'
function App() {

  const [input, setInput] = useState('')
  const [cep,setCep] = useState({});


  async function handleSearch(){
    if(input === ''){
      alert("Digite alguma coisa...")
      return;
    }

    try {
      const response = await api.get(`${input}/json/`);
      setCep(response.data)
      setInput("");
    } catch {
      alert("Erro ao buscar ;-;")
      setInput("")
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR CEP</h1>
      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(event) => setInput(event.target.value) }
        onKeyPress={handleKeyPress}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      

      </div>



      {Object.keys(cep).length > 0 && (
          <main className='main'>
              <h2>CEP: {cep.cep} </h2>
              <span> DDD {cep.ddd} </span>
              <span> {cep.logradouro} </span>
              <span> {cep.complemento} </span>
              <span> {cep.bairro} </span>
              <span> {cep.localidade} - {cep.uf} </span>
          </main>
      )}




    </div>
  );
}


export default App;
