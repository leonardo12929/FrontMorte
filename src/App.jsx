import { useState } from "react";
import "./App.css";
import mandos from "./assets/cabra.jpg";

function App() {
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function enviar(event) {
    event.preventDefault();

    setCarregando(true);

    const formData = new FormData(event.target);

    const ano = formData.get("ano");
    const email = formData.get("email");
    
    await fetch("http://localhost:8080/morte", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ano,
        email,
      }),
    });


    setEnviado(true);
  }
  
  

  
  
  return (
    <div id="app">
      <div
        id="background"
        style={{ backgroundImage: `url(${mandos})` }}
      />

      <div id="content">

        {!enviado ? (
          <>
            <h1>Descubra o dia de sua morte</h1>
            <form className="dados" onSubmit={enviar}>
              <input type="number" placeholder="Ano de nascimento" name="ano" required></input>
              <input type="email" placeholder="Seu email" name="email" required></input>
              <button type="submit" disabled={carregando}>

                {carregando ? "Carregando..." : "Mostre-me"}
              </button>

              {carregando && (
                <p>Consultando os arquivos de Mandos...</p>
              )}
            </form>   
          </>
          ) : (
              <>
                <h1>Verifique seu e-mail</h1>
                <h1>Seu Destino foi definido</h1>
              </>
            )
        }
      </div>
    </div>
  );
}

export default App;