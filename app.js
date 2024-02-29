//Cria uma variável com as configurações do jogo
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  //Adiciona as cenas do jogo
  scene: [Menu, Jogo]
};

//Inicia um novo projeto Phaser
let game = new Phaser.Game(config);
