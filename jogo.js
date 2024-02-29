//Cria a classe 'Jogo' que herda de Phaser.Scene
class Jogo extends Phaser.Scene {
    //Declaração de variáveis
    bird;
    hasLanded = false;
    hasBumped = false;
    isGameStarted = false;
    score = 0;
    messageToPlayer;
    topColumns;
    bottomColumns;
    road;
    scoreText;

    //Define o construtor da classe Jogo, passando um objeto de configuração com a chave "Jogo".
    constructor() {
        super({ key: "Jogo" });
    };

    //Pré-carregamento de recursos do jogo (imagens)
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('road', 'assets/road.png');
        this.load.image('column', 'assets/column.png');
        this.load.image('frame1', 'assets/frame-1.png');
        this.load.image('frame2', 'assets/frame-2.png');
        this.load.image('frame3', 'assets/frame-3.png');
        this.load.image('frame4', 'assets/frame-4.png');
    }

    //Criação e configuração dos elementos do jogo
    create() {
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0); //Define a posição de origem da imagem de fundo
        const roads = this.physics.add.staticGroup();
        this.topColumns = this.physics.add.staticGroup({
            key: 'column',
            repeat: 1,
            setXY: { x: 200, y: 0, stepX: 300 }
        });

        //Implementa a física e coordenadas das colunas
        this.bottomColumns = this.physics.add.staticGroup({
            key: 'column',
            repeat: 1,
            setXY: { x: 350, y: 400, stepX: 300 },
        });
        this.road = roads.create(400, 568, 'road').setScale(2).refreshBody();

        this.bird = this.physics.add.sprite(100, 300, 'frame1').setScale(0.05); // Redimensionando o pássaro 
        this.bird.setCollideWorldBounds(true);

        //Configura a animação do pássaro
        this.anims.create({
            key: 'flap',
            frames: [
            { key: 'frame1' },
            { key: 'frame2' },
            { key: 'frame3' },
            { key: 'frame4' }
            ],
            frameRate: 10,
            repeat: -1
        });

        //Define as colisões dos elementos do jogo
        this.bird.anims.play('flap', true);

        this.physics.add.collider(this.bird, this.road);
        this.physics.add.collider(this.bird, this.topColumns);
        this.physics.add.collider(this.bird, this.bottomColumns);

        //Cria os cursores do jogo
        this.cursors = this.input.keyboard.createCursorKeys();

        //Configura as mensagens de texto que aparecem na tela
        this.messageToPlayer = this.add.text(0, 0, 'Aperte ESPAÇO para começar', { fontFamily: '"Comic Sans MS", Times, serif', fontSize: "20px", color: "black", backgroundColor: "white" });
        Phaser.Display.Align.In.BottomCenter(this.messageToPlayer, background, 0, 50);

        // Adicionando texto para exibir a pontuação
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        this.hasLanded = false;
        this.hasBumped = false;
        this.isGameStarted = false;
        this.score = 0;
    }

    //Método de atualização 
    update() {
        if (this.cursors.space.isDown && !this.isGameStarted) {
            this.isGameStarted = true;
            this.messageToPlayer.text = 'Aperte o botão "^" (Page Up) para subir';
        }
        //Define a velocidade do pássaro nos eixos X e Y
        if (!this.isGameStarted) {
            this.bird.setVelocityY(-160);
        }

        if (this.cursors.up.isDown && !this.hasLanded && !this.hasBumped) {
            this.bird.setVelocityY(-160);
        }

        if (this.isGameStarted && (!this.hasLanded || !this.hasBumped)) {
            this.bird.body.velocity.x = 50;
        } else {
            this.bird.body.velocity.x = 0;
        }
        //Mensagem final ao completar o jogo 
        if (this.bird.x > 750) {
            this.bird.setVelocityY(40);
            this.messageToPlayer.text = 'Parabéns, você venceu!'
        }

        // Atualizar pontuação quando passar pelos obstáculos
        if (this.bird.x > 300 && !this.hasLanded && !this.hasBumped) {
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);
        }
    }

}