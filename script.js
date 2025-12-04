async function buscarTempo() {
    const cidade = document.getElementById("cidade").value.trim();
    const erro = document.getElementById("erro");
    const resultado = document.getElementById("resultado");

    erro.textContet = "";
    resultado.classList.add("hidden");

    if (cidade === "") {
        erro.textContent = "Digite o nome de uma cidade!";
        return;
    }

    const apiKey = "5104515b692a20f0186e41d6757103ee";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);

        if (!Response.ok) {
            throw new Error("Cidade não encontrada ou limite excedido.")
        }

        const data = Response.json();

        document.getElementById("cidadeTitulo").textContent = data.name;
        document.getElementById("temp").textContent = data.main.temp;
        document.getElementById("umidade").textContent = data.main.humidity;
        document.getElementById("vento").textContent = data.wind.speed;
        document.getElementById("descricao").textContent = data.weather[0].description;

        const icone = data.weather[0].icon;
        document.getElementById("icone").scr = `https://openweathermap.org/img/wn${icone2}@2x.png`;

        resultado.classList.remove("hidden");

    } catch (error) {
        erro.textContent = "Erro: " + error.message;
    }
}