const readlineSync = require('readline-sync');

      // Criaturas e Níveis de XP (EM IMPLEMENTAÇÃO VIDA, ATK E DEF)
      /*
  
      Goblin
        VIDA: 100
        ATK: 
        DEF:
        XP: 50

      Lobo Selvagem += 100
        VIDA:
        ATK:
        DEF:
        XP: 100

      Orc += 200

        VIDA:
        ATK:
        DEF:
        XP: 200

      Troll 
        VIDA:
        ATK:
        DEF: 
        XP: 300

      Dragão Jovem += 1000
        VIDA: 
        ATK: 
        DEF:
        XP: 500

      Dragão Adulto
        VIDA:
        ATK:
        DEF:
        XP: 2000

      */

      // Incrementa XP baseado na escolha da criatura

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

// Função para somar XP atual + Ganho

function ganharXP(Criatura){
  switch(Criatura){
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
      5. Dragão Jovem (+1000 XP)
      6. Dragão Adulto (+2000 XP)
      Escolha uma criatura: `);

      let xpGanho = ganharXP(parseInt(escolhaFloresta));
      if (xpGanho > 0) {
        xpUser += xpGanho;
        console.log(`Você ganhou ${xpGanho} de XP! Seu XP agora é ${xpUser}.`);

      } else {
        console.log("Escolha inválida.");
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
