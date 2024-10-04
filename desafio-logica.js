const readlineSync = require('readline-sync');

// Inicializando variáveis
let nameUser = readlineSync.question("Qual o seu nome, Herói? ");
let xpUser = 0;

console.log(`Seja bem-vindo, ${nameUser}!`);

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

// Loop para manter o menu ativo até o usuário desistir
while (true) {
  // Mensagem principal
  console.log(`${nameUser}, o que deseja fazer?`);

  // Menu principal
  let escolhaUser = readlineSync.question(`
1. Ver com o mago da aldeia meu nível de XP
2. Ir à floresta e ganhar XP
3. Desistir
Escolha uma opção: `);

  // Switch para lidar com as escolhas do usuário
  switch (parseInt(escolhaUser)) {
    case 1: // Ver o nível de XP
      let nivelUser = determinarNivel(xpUser); // Chama a função para determinar o nível
      console.log(`Você, ${nameUser}, está com ${xpUser} pontos de XP e está no nível ${nivelUser}.`);
      break;
    
    case 2: // Ir à floresta e ganhar XP
      let escolhaFloresta = readlineSync.question(`
      O que você quer enfrentar?
      1. Goblin (+50 XP)
      2. Lobo Selvagem (+100 XP)
      3. Orc (+200 XP)
      4. Troll (+300 XP)
      5. Dragão Jovem (+500 XP)
      6. Dragão Adulto (+1000 XP)
      Escolha uma criatura: `);

      // Criaturas e Níveis de XP
      /*
      CRIATURA = NÍVEL DE XP A GANHAR

      Goblin += 50
      Lobo Selvagem += 100
      Orc += 200
      Troll += 300
      Dragão Jovem += 500
      Dragão Adulto += 1000
      */

      // Incrementa XP baseado na escolha da criatura
      switch (parseInt(escolhaFloresta)) {
        case 1:
          xpUser += 50;
          console.log(`Você enfrentou um Goblin! Seu XP agora é ${xpUser}.`);
          break;
        case 2:
          xpUser += 100;
          console.log(`Você enfrentou um Lobo Selvagem! Seu XP agora é ${xpUser}.`);
          break;
        case 3:
          xpUser += 200;
          console.log(`Você enfrentou um Orc! Seu XP agora é ${xpUser}.`);
          break;
        case 4:
          xpUser += 300;
          console.log(`Você enfrentou um Troll! Seu XP agora é ${xpUser}.`);
          break;
        case 5:
          xpUser += 500;
          console.log(`Você enfrentou um Dragão Jovem! Seu XP agora é ${xpUser}.`);
          break;
        case 6:
          xpUser += 1000;
          console.log(`Você enfrentou um Dragão Adulto! Seu XP agora é ${xpUser}.`);
          break;
        default:
          console.log("Escolha inválida.");
          break;
      }
      break;

    case 3: // Desistir
      console.log("Você desistiu do jogo.E sua XP foi resetada!");
      return; // Encerra o programa

    default:
      console.log("Opção inválida. Tente novamente.");
      break;
  }
}
