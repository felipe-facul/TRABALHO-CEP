document.getElementById('search-btn').addEventListener('click', buscarCep);

function buscarCep() {
    const cepInput = document.getElementById('cep-input').value.trim();
    const resultDiv = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    const resultTable = document.getElementById('result-table');

    // Limpar mensagens e resultados anteriores
    resultDiv.classList.add('d-none');
    errorMessage.classList.add('d-none');
    resultTable.innerHTML = '';

    if (cepInput === '' || cepInput.length !== 8) {
        alert('Por favor, insira um CEP válido de 8 dígitos.');
        return;
    }

    fetch(`https://brasilapi.com.br/api/cep/v2/${cepInput}`)
        .then(response => {
            if (!response.ok) throw new Error('CEP não encontrado');
            return response.json();
        })
        .then(data => exibirResultado(data))
        .catch(() => errorMessage.classList.remove('d-none'));
}

function exibirResultado(data) {
    const resultDiv = document.getElementById('result');
    const resultTable = document.getElementById('result-table');

    resultTable.innerHTML = `
        <tr><th>CEP</th><td>${data.cep}</td></tr>
        <tr><th>Estado</th><td>${data.state}</td></tr>
        <tr><th>Cidade</th><td>${data.city}</td></tr>
        <tr><th>Bairro</th><td>${data.neighborhood || 'N/A'}</td></tr>
        <tr><th>Rua</th><td>${data.street || 'N/A'}</td></tr>
    `;

    resultDiv.classList.remove('d-none');
    resultDiv.classList.add('fade-in');  // Adiciona a classe fade-in para animação
}
