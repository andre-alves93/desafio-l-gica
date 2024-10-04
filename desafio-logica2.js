const readlineSync = require('readline-sync');

// Inicializando variáveis
let nameUser = readlineSync.question("Qual o seu nome, Herói? ");
let xpUser = 0;
let vitorias = 0; // Usando um inteiro para armazenar o número de vitórias
let derrotas = 0; // Usando um inteiro para armazenar o número de derrotas
let saldoRankAtual = 0;

// Função para determinar o nível com base no XP
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

// Função para somar XP atual + Ganho
function ganharXP(criatura) {
  switch (criatura) {
    case 1: // Goblin
      return 50;
    case 2: // Lobo Selvagem
      return 100;
    case 3: // Orc
      return 200;
    case 4: // Troll
      return 300;
    case 5: // Dragão Jovem
      return 1000;
    case 6: // Dragão Adulto
      return 2000;
    default:
      return 0; // Caso escolha inválida
  }
}

// Função para perda de XP baseada na criatura
function perderXP(criatura) {
  switch (criatura) {
    case 1: // Goblin
      return 25; // Perda de 25 XP ao perder para o Goblin
    case 2: // Lobo Selvagem
      return 50; // Perda de 50 XP ao perder para o Lobo Selvagem
    case 3: // Orc
      return 100; // Perda de 100 XP ao perder para o Orc
    case 4: // Troll
      return 150; // Perda de 150 XP ao perder para o Troll
    case 5: // Dragão Jovem
      return 500; // Perda de 500 XP ao perder para o Dragão Jovem
    case 6: // Dragão Adulto
      return 1000; // Perda de 1000 XP ao perder para o Dragão Adulto
    default:
      return 0; // Caso escolha inválida
  }
}

// Função para determinar o rank do Herói baseado no número de vitórias
function saldoRank(vitorias) {
  if (vitorias < 10) {
    return "Ferro";
  } else if (vitorias >= 10 && vitorias <= 20) {
    return "Bronze";
  } else if (vitorias >= 21 && vitorias <= 50) {
    return "Prata";
  } else if (vitorias >= 51 && vitorias <= 80) {
    return "Ouro";
  } else if (vitorias >= 81 && vitorias <= 90) {
    return "Diamante";
  } else if (vitorias >= 91 && vitorias <= 100) {
    return "Lendário";
  } else if (vitorias >= 101) {
    return "Imortal";
  } else {
    return "Classificação não definida";
  }
}

// Mensagem de boas vindas
console.log(`Seja bem-vindo, ${nameUser}!`);

// Loop para manter o menu ativo até o usuário desistir
while (true) {
  // Mensagem principal
  console.log(`${nameUser}, o que deseja fazer?`);

  // Menu principal
  let escolhaUser = readlineSync.question(`
1. Ver com o mago da aldeia meu nível de XP, vitórias e derrotas
2. Ir à floresta e ganhar XP
3. Info. de nível de XP e Rank
4. Desistir
Escolha uma opção: `);

  // Switch para lidar com as escolhas do usuário
  switch (parseInt(escolhaUser)) {
    case 1: // Ver o nível de XP, vitórias e derrotas
      let nivelUser = determinarNivel(xpUser); // Chama a função para determinar o nível
      console.log(`Você, ${nameUser}, está com ${xpUser} pontos de XP e está no nível ${nivelUser}.`);
      let rankAtual = saldoRank(vitorias); // Calcula o rank baseado nas vitórias
      console.log(`Você possui ${vitorias} vitórias e ${derrotas} derrotas. Seu rank é: ${rankAtual}`);
      break;
    
    case 2: // Ir à floresta e ganhar/perder XP
      let escolhaFloresta = readlineSync.question(`
      O que você quer enfrentar?
      1. Goblin (+50 XP, -25 XP se perder)
      2. Lobo Selvagem (+100 XP, -50 XP se perder)
      3. Orc (+200 XP, -100 XP se perder)
      4. Troll (+300 XP, -150 XP se perder)
      5. Dragão Jovem (+1000 XP, -500 XP se perder)
      6. Dragão Adulto (+2000 XP, -1000 XP se perder)
      Escolha uma criatura: `);

      // Simular batalha (ganhar ou perder aleatoriamente)
      let venceu = Math.random() > 0.5; // Ganha ou perde com 50% de chance

      if (venceu) {
        let xpGanho = ganharXP(parseInt(escolhaFloresta));
        xpUser += xpGanho;
        vitorias++; // Incrementa o número de vitórias
        console.log(`Você venceu a batalha e ganhou ${xpGanho} de XP! Seu XP agora é ${xpUser}.`);
        console.log(`Você agora tem ${vitorias} vitórias.`);
      } else {
        let xpPerdido = perderXP(parseInt(escolhaFloresta));
        xpUser = Math.max(0, xpUser - xpPerdido); // Garante que o XP não fique negativo
        derrotas++; // Incrementa o número de derrotas
        console.log(`Você perdeu a batalha e perdeu ${xpPerdido} de XP. Seu XP agora é ${xpUser}.`);
        console.log(`Você agora tem ${derrotas} derrotas.`);
      }
      break;
    
    case 3:
      console.log(`
        ***** XP - Níveis *****
        XP < 1000        = FERRO
        XP 1000 - 1999   = BRONZE
        XP 2000 - 2999   = PRATA
        XP 3000 - 3999   = OURO
        XP 4000 - 4999   = PLATINA
        XP 5000 - 5999   = DIAMANTE
        XP 6000 - 6999   = ASCENDENTE
        XP 7000 - 7999   = RADIANTE
        XP 8000 - 8999   = IMORTAL
        XP 9000 - 9999   = DEMIGOD
        XP >= 10000      = GOD

        ***** RANK - Vitórias *****
        Vitórias < 10    = FERRO
        Vitórias 11 - 20 = BRONZE
        Vitórias 21 - 50 = PRATA
        Vitórias 51 - 80 = OURO
        Vitórias 81 - 90 = DIAMANTE
        Vitórias 91 - 100 = LENDÁRIO
        Vitórias >= 101  = IMORTAL
      `);
      break;
      
    case 4: // Desistir
      console.log("Você desistiu do jogo. E sua XP foi resetada!");
      return; // Encerra o programa

    default:
      console.log("Opção inválida. Tente novamente.");
      break;
  }
}
