async function buscarTempo() {
    // Declara uma função assíncrona chamada buscarTempo()
    // "async" permite usar "await" dentro da função

    const cidade = document.getElementById("cidade").value.trim();
    // Pega o valor digitado no input com id="cidade"
    // trim() remove espaços extras no começo e no final

    const erro = document.getElementById("erro");
    // Seleciona o elemento onde mensagens de erro serão exibidas

    const resultado = document.getElementById("resultado");
    // Seleciona a div que contém os dados do clima

    erro.textContent = "";
    // Limpa qualquer mensagem de erro anterior

    resultado.classList.add("hidden");
    // Esconde a área de resultado antes de fazer nova busca

    if (cidade === "") {
        // Verifica se o campo está vazio

        erro.textContent = "Digite o nome de uma cidade!";
        // Mostra mensagem de erro se estiver vazio

        return;
        // Interrompe a execução da função
    }

    const apiKey = "5104515b692a20f0186e41d6757103ee";
    // Chave da API do OpenWeatherMap

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`;
    // Monta a URL da requisição
    // encodeURIComponent evita erro com espaços ou caracteres especiais
    // units=metric → temperatura em Celsius
    // lang=pt_br → descrição em português

    try {
        // Bloco para tentar executar a requisição

        const response = await fetch(url);
        // Faz a requisição para a API e espera a resposta

        if (!response.ok) {
            // Verifica se a resposta foi bem-sucedida (status 200)

            throw new Error("Cidade não encontrada ou limite excedido.");
            // Lança erro caso a resposta não seja válida
        }

        const data = await response.json();
        // Converte a resposta para formato JSON

        document.getElementById("cidadeTitulo").textContent = data.name;
        // Mostra o nome da cidade retornado pela API

        document.getElementById("temp").textContent = data.main.temp;
        // Mostra a temperatura

        document.getElementById("umidade").textContent = data.main.humidity;
        // Mostra a umidade do ar

        document.getElementById("vento").textContent = data.wind.speed;
        // Mostra a velocidade do vento

        document.getElementById("descricao").textContent = data.weather[0].description;
        // Mostra a descrição do clima

        document.getElementById("visibilidade").textContent = data.visibility;
        // Mostra a visibilidade (em metros)

        const icone = data.weather[0].icon;
        // Pega o código do ícone do clima

        document.getElementById("icone").src = `https://openweathermap.org/img/wn/${icone}@2x.png`;
        // Define a imagem do ícone com base no código retornado

        resultado.classList.remove("hidden");
        // Exibe a área de resultado após sucesso

    } catch (error) {
        // Captura qualquer erro que acontecer no try

        erro.textContent = "Erro: " + error.message;
        // Mostra a mensagem de erro na tela
    }
}
