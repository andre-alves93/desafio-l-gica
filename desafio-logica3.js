const readlineSync = require('readline-sync');

// Classes de Personagens
class Personagem {
    constructor(nome, ataque, defesa) {
        this.nome = nome;
        this.ataque = ataque;
        this.defesa = defesa;
        this.xp = 0; // XP inicial
        this.vitorias = 0; // Vitórias iniciais
        this.derrotas = 0; // Derrotas iniciais
        this.armaEquipada = null; // Inicialmente sem arma
    }
}

// Classe de Armas
class Arma {
    constructor(nome, ataque, durabilidade) {
        this.nome = nome;
        this.ataque = ataque;
        this.durabilidade = durabilidade;
    }
}

// Personagens disponíveis
const personagens = {
    guerreiro: new Personagem("Guerreiro", 80, 70),
    mago: new Personagem("Mago", 50, 30),
    monge: new Personagem("Monge", 60, 40),
    ninja: new Personagem("Ninja", 90, 50)
};

// Armas disponíveis
const armas = {
    espada: new Arma("Espada", 100, 80),
    cajadoMagico: new Arma("Cajado Mágico", 70, 60),
    bastao: new Arma("Bastão", 60, 70),
    shuriken: new Arma("Shuriken", 90, 50)
};

// Função para calcular o nível do personagem baseado no XP
function determinarNivel(xp) {
    if (xp < 1000) return "FERRO";
    else if (xp >= 1000 && xp < 2000) return "BRONZE";
    else if (xp >= 2000 && xp < 3000) return "PRATA";
    else if (xp >= 3000 && xp < 4000) return "OURO";
    else if (xp >= 4000 && xp < 5000) return "PLATINA";
    else if (xp >= 5000 && xp < 6000) return "DIAMANTE";
    else if (xp >= 6000 && xp < 7000) return "ASCENDENTE";
    else if (xp >= 7000 && xp < 8000) return "RADIANTE";
    else if (xp >= 8000 && xp < 9000) return "IMORTAL";
    else if (xp >= 9000 && xp < 10000) return "DEMIGOD";
    else return "GOD";
}

// Função para calcular o rank do personagem baseado no número de vitórias
function saldoRank(vitorias) {
    if (vitorias < 10) return "FERRO";
    else if (vitorias >= 10 && vitorias <= 20) return "BRONZE";
    else if (vitorias >= 21 && vitorias <= 50) return "PRATA";
    else if (vitorias >= 51 && vitorias <= 80) return "OURO";
    else if (vitorias >= 81 && vitorias <= 90) return "DIAMANTE";
    else if (vitorias >= 91 && vitorias <= 100) return "LENDÁRIO";
    else if (vitorias >= 101) return "IMORTAL";
    else return "Classificação não definida";
}

// Função para ajustar o ataque da arma caso ela não combine com o personagem
function ajustarAtaque(arma, personagem) {
    const combinacoes = {
        "Guerreiro": "Espada",
        "Mago": "Cajado Mágico",
        "Monge": "Bastão",
        "Ninja": "Shuriken"
    };
    
    if (arma && arma.nome !== combinacoes[personagem.nome]) {
        const descontoPercentual = Math.random() * (5 - 2) + 2; // Random entre 2% e 5%
        const desconto = arma.ataque * (descontoPercentual / 100);
        return Math.round(arma.ataque - desconto);
    }
    return arma ? arma.ataque : personagem.ataque; // Caso não tenha arma, usa o ataque do personagem
}

// Função para somar XP baseado na criatura enfrentada
function ganharXP(criatura) {
    switch (criatura) {
        case 1:
            return 50; // Goblin
        case 2:
            return 100; // Lobo Selvagem
        case 3:
            return 200; // Orc
        case 4:
            return 300; // Troll
        case 5:
            return 1000; // Dragão Jovem
        case 6:
            return 2000; // Dragão Adulto
        default:
            return 0;
    }
}

// Função para perder XP ao perder uma batalha
function perderXP(criatura) {
    switch (criatura) {
        case 1:
            return 25; // Goblin
        case 2:
            return 50; // Lobo Selvagem
        case 3:
            return 100; // Orc
        case 4:
            return 150; // Troll
        case 5:
            return 500; // Dragão Jovem
        case 6:
            return 1000; // Dragão Adulto
        default:
            return 0;
    }
}

// Função para ir à floresta e ganhar/perder XP com 50% de chance
function irAFloresta(personagem) {
    let escolhaFloresta = readlineSync.question(`
    O que você quer enfrentar?
    1. Goblin (+50 XP)
    2. Lobo Selvagem (+100 XP)
    3. Orc (+200 XP)
    4. Troll (+300 XP)
    5. Dragão Jovem (+1000 XP)
    6. Dragão Adulto (+2000 XP)
    Escolha uma criatura: `);

    let venceu = Math.random() > 0.5; // Ganha ou perde com 50% de chance

    // Calcular ataqueFinal antes do if/else, pois ele será usado em ambos os casos
    let ataqueFinal = ajustarAtaque(personagem.armaEquipada, personagem);

    if (venceu) {
        let xpGanho = ganharXP(parseInt(escolhaFloresta));
        personagem.xp += xpGanho;
        personagem.vitorias++; // Incrementa o número de vitórias

        // Usando ataqueFinal corretamente
        console.log(`${personagem.nome} atacou com ${personagem.armaEquipada ? personagem.armaEquipada.nome : "sem arma"}, causando dano de: ${ataqueFinal}`);
        console.log(`Você venceu a batalha e ganhou ${xpGanho} de XP! Seu XP agora é ${personagem.xp}.`);
        console.log(`Você agora tem ${personagem.vitorias} vitória(s).`);
    } else {
        let xpPerdido = perderXP(parseInt(escolhaFloresta));
        personagem.xp = Math.max(0, personagem.xp - xpPerdido); // Garante que o XP não fique negativo
        personagem.derrotas++; // Incrementa o número de derrotas

        // Usando ataqueFinal também aqui
        console.log(`${personagem.nome} atacou com ${personagem.armaEquipada ? personagem.armaEquipada.nome : "sem arma"}, causando dano de: ${ataqueFinal}`);
        console.log(`Você perdeu a batalha e perdeu ${xpPerdido} de XP. Seu XP agora é ${personagem.xp}.`);
        console.log(`Você agora tem ${personagem.derrotas} derrota(s).`);
    }
}


// Pergunta o nome do herói
let nomeHeroi = readlineSync.question("Qual o seu nome, herói? ");
console.log(`Seja bem-vindo, ${nomeHeroi}!`);

// Escolha de classe de personagem
let escolhaClasse = readlineSync.question(`
Escolha sua classe de personagem:
1. Guerreiro
2. Mago
3. Monge
4. Ninja
Escolha uma opção: `);

let personagemEscolhido;
switch (parseInt(escolhaClasse)) {
    case 1:
        personagemEscolhido = personagens.guerreiro;
        break;
    case 2:
        personagemEscolhido = personagens.mago;
        break;
    case 3:
        personagemEscolhido = personagens.monge;
        break;
    case 4:
        personagemEscolhido = personagens.ninja;
        break;
    default:
        console.log("Opção inválida! Escolha uma classe válida.");
        break;
}

// Menu principal
while (true) {
    let escolhaUser = readlineSync.question(`
1. Ver informações do personagem
2. Visitar armeiro
3. Ir à floresta e ganhar/perder XP
4. Sair
Escolha uma opção: `);

    switch (parseInt(escolhaUser)) {
        case 1: // Ver informações do personagem
            let nivel = determinarNivel(personagemEscolhido.xp); // Nível baseado no XP
            let rank = saldoRank(personagemEscolhido.vitorias); // Rank baseado nas vitórias
            console.log(`
            Nome: ${personagemEscolhido.nome}
            Ataque: ${personagemEscolhido.ataque}
            Defesa: ${personagemEscolhido.defesa}
            XP: ${personagemEscolhido.xp} (Nível: ${nivel})
            Vitórias: ${personagemEscolhido.vitorias} (Rank: ${rank})
            Derrotas: ${personagemEscolhido.derrotas}
            Arma equipada: ${personagemEscolhido.armaEquipada ? personagemEscolhido.armaEquipada.nome : "Nenhuma"}
            `);
            break;

        case 2: // Visitar armeiro e escolher arma
            let escolhaArma = readlineSync.question(`
            Escolha uma arma:
            1. Espada
            2. Cajado Mágico
            3. Bastão
            4. Shuriken
            5. Nenhuma
            Escolha uma opção: `);

            let armaEscolhida;
            switch (parseInt(escolhaArma)) {
                case 1:
                    armaEscolhida = armas.espada;
                    break;
                case 2:
                    armaEscolhida = armas.cajadoMagico;
                    break;
                case 3:
                    armaEscolhida = armas.bastao;
                    break;
                case 4:
                    armaEscolhida = armas.shuriken;
                    break;
                case 5:
                    armaEscolhida = null; // Não escolhe nenhuma arma
                    console.log(`${personagemEscolhido.nome} não escolheu nenhuma arma.`);
                    break;
                default:
                    console.log("Opção inválida! Escolha uma arma válida.");
                    break;
            }

            if (armaEscolhida !== undefined) {
                personagemEscolhido.armaEquipada = armaEscolhida;
                if (armaEscolhida) {
                    console.log(`${personagemEscolhido.nome} equipou ${armaEscolhida.nome}.`);
                }
            }
            break;

        case 3: // Ir à floresta e ganhar/perder XP
            irAFloresta(personagemEscolhido);
            break;

        case 4: // Sair do jogo
            console.log("Você saiu do jogo.");
            return;

        default:
            console.log("Opção inválida! Tente novamente.");
            break;
    }
}
