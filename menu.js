//Criação da classe 'Menu' que herda de Phaser.Scene
class Menu extends Phaser.Scene {
    //Método construtor que recebe a chave "Menu"
    constructor() {
        super({ key: "Menu" });
    };
    //Pré-carregamento do botão
    preload() {
        this.load.image('botao', 'assets/startbutton.png');
    }
    //Criação do botão e configurações de posição
    create() {
        let botao = this.add.image(380, 250, 'botao');
        botao.setInteractive();

        botao.on('pointerup', () => {
            this.scene.start('Jogo');
        });
    }
}