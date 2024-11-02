const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML

const url = 'https://veja.abril.com.br/vitrine-livros-mais-vendidos/';

async function fetchData() {
    try {
        // Faz a requisição da página
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Verifica os seletores específicos da página
        const tabelaStatus = $('.card');
        const tabelaLivros = [];

        // Itera sobre os elementos da tabela
        tabelaStatus.each(function () {
            const classificacao = $(this).find('.classificacao').trim();
            const nomeLivro = $(this).find('h3').text().trim();
            const nomeAutor = $(this).find('.autor').text().trim();
            const nomeEditora = $(this).find('.editora').text().trim();
            

            // Checa se os dados foram coletados corretamente antes de adicionar
            if (classificacao && nomeLivro && nomeAutor && nomeEditora) {
                tabelaLivros.push({
                    classificacao,
                    nomeLivro,
                    nomeAutor,
                    nomeEditora,
                });
            }
        });

        // Exibe os dados no console
        console.log(tabelaLivros);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Executa a função
fetchData();