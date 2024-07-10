document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agenda');
    const inputNumeroContato = document.getElementById('numero-contato');
    const nome = [];
    const numero = [];

    let linhas = '';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        adicionaLinha();
        atualizaTabela();
    });

    inputNumeroContato.addEventListener('input', formatarNumero);

    function adicionaLinha() {
        const inputNomeContato = document.getElementById('nome-contato');

        if (!validaNumero(inputNumeroContato.value)) {
            alert('Número de contato inválido. O formato deve ser (DDD) 12345-6789.');
            return;
        }

        if (nome.includes(inputNomeContato.value)) {
            alert(`O contato com o nome: ${inputNomeContato.value} já foi cadastrado.`);
        } else if (numero.includes(inputNumeroContato.value)) {
            alert(`O contato com o número: ${inputNumeroContato.value} já foi cadastrado.`);
        } else {
            nome.push(inputNomeContato.value);
            numero.push(inputNumeroContato.value);
        
            let linha = '<tr>';
            linha += `<td>${inputNomeContato.value}</td>`;
            linha += `<td>${inputNumeroContato.value}</td>`;
            linha += `</tr>`;
        
            linhas += linha;
        }

        inputNomeContato.value = '';
        inputNumeroContato.value = '';
    }

    function atualizaTabela() {
        const corpoTabela = document.querySelector('tbody');
        if (corpoTabela) {
            corpoTabela.innerHTML = linhas;
        } else {
            console.error('Elemento tbody não encontrado.');
        }
    }

    function validaNumero(numero) {
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return regex.test(numero);
    }

    function formatarNumero(event) {
        let numero = event.target.value.replace(/\D/g, '');
        
        if (numero.length > 11) {
            numero = numero.slice(0, 11);
        }

        if (numero.length > 6) {
            numero = numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (numero.length > 2) {
            numero = numero.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            numero = numero.replace(/(\d{0,2})/, '($1');
        }

        event.target.value = numero;
    }
});
