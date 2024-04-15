function distanciaDeEdicaoComOperacoes(s1, s2) {
    const m = s1.length;
    const n = s2.length;

    // Cria uma matriz para armazenar os resultados dos subproblemas
    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));
    const operacoesSet = new Set();

    // Função auxiliar para adicionar uma operação ao conjunto de operações
    const adicionarOperacao = (op) => {
        operacoesSet.add(op);
    };

    // Preenche a primeira linha e a primeira coluna da matriz
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
        if (i > 0) adicionarOperacao(`remover ${s1[i - 1]}`);
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
        if (j > 0) adicionarOperacao(`inserir ${s2[j - 1]}`);
    }

    // Preenche a matriz com os valores corretos e as operações correspondentes
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                const remocao = dp[i - 1][j] + 1;
                const insercao = dp[i][j - 1] + 1;
                const substituicao = dp[i - 1][j - 1] + 1;
                const menor = Math.min(remocao, insercao, substituicao);

                dp[i][j] = menor;

                if (menor === remocao) {
                    adicionarOperacao(`remover ${s1[i - 1]}`);
                } else if (menor === insercao) {
                    adicionarOperacao(`inserir ${s2[j - 1]}`);
                } else {
                    adicionarOperacao(`substituir ${s1[i - 1]} por ${s2[j - 1]}`);
                }
            }
        }
    }

    // Converte o conjunto de operações para uma matriz e a retorna
    const operacoes = Array.from(operacoesSet);
    return {
        distancia: dp[m][n],
        operacoes: operacoes
    };
}

// Teste
const a = "casa";
const b = "casinha";

const resultado = distanciaDeEdicaoComOperacoes(a, b);

console.log('\nTotal de operações:', resultado.distancia);
console.log('\nOperações realizadas:');
console.log(resultado.operacoes);
