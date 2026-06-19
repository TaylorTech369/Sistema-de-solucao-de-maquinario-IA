import { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [equipamento, setEquipamento] = useState('esteira_transportadora');
  const [sintoma, setSintoma] = useState('');
  const [resposta, setResposta] = useState('')

  async function enviar_erro() {

    try {
      const response = await axios.post("http://localhost:3000/perguntar", {
        sintoma: sintoma,
        equipamento: equipamento
      });

      setResposta(response.data.text)


    } catch (error) {
      console.error("Erro:", error);
      setResposta("Houve um erro ao enviar os dados.");
    }


  }

  return (

    <>
      <h1>Front-end</h1>
      <p><strong>Equipamento:</strong> {equipamento}</p>
      <p><strong>Sintoma:</strong> {sintoma}</p>


      {/* <input
        id='campo_equipamento'
        className='campos_de_erro'
        type="text"
        value={equipamento}
        onChange={e => setEquipamento(e.target.value)}
        placeholder='Equipamento'
      /> */}

      <label>Selecione o equipamento com falha:</label>

      <select
        name="Equipamentos"
        id="equipamentos"
        value={equipamento}
        onChange={e => setEquipamento(e.target.value)}
      >

        <option value="esteira_transportadora">Esteira Transportadora</option>
        <option value="braco_robotico">Braço Robótico / Manipulador</option>

        <option value="clp">CLP (Controlador Lógico Programável)</option>
        <option value="inversor_frequencia">Inversor de Frequência</option>

        <option value="motor_eletrico">Motor Elétrico (Indução)</option>
        <option value="compressor_parafuso">Compressor de Ar (Parafuso)</option>
        <option value="bomba_hidraulica">Bomba Hidráulica / Centrífuga</option>

        <option value="forno_industrial">Forno / Estufa Industrial</option>
        <option value="transformador">Transformador de Potência</option>
      </select>

      <input
        id='campo_sintoma'
        className='campos_de_erro'
        type="text"
        value={sintoma}
        onChange={e => setSintoma(e.target.value)}
        placeholder='Sintoma'
      />


      <button id='botao_de_envio' onClick={enviar_erro}>Enviar erro</button>

      {resposta && (
        <div id='respostaDiv'>
          <hr />
          <p>{resposta}</p>
        </div>
      )}


    </>

  );
}

export default App