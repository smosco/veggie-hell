import Phaser from 'phaser';

enum GameState {
  Start = 'START',
  Play = 'PLAY',
  Die = 'DIE',
}

let currentState: GameState = GameState.Start;
let startText: Phaser.GameObjects.Text;
let retryText: Phaser.GameObjects.Text;

export default class GameScene extends Phaser.Scene {
  // 토끼 물리 객체 선언
  private rabbit!: MatterJS.BodyType;

  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('preload');
  }

  create() {
    console.log('create');

    this.cameras.main.setBackgroundColor('#d0f4f7');

    // 게임 시작 버튼
    startText = this.add
      .text(300, 280, '게임 시작', {
        fontSize: '28px',
        color: '#222',
        backgroundColor: '#fff',
        padding: { x: 16, y: 8 },
      })
      .setInteractive();

    startText.on('pointerdown', () => {
      this.startGame();
    });

    // 다시하기 버튼
    retryText = this.add
      .text(310, 280, '다시하기', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#555',
        padding: { x: 12, y: 6 },
      })
      .setInteractive()
      .setVisible(false);

    retryText.on('pointerdown', () => {
      this.startGame();
    });

    // 바닥 만들기 (정적인 충돌체)
    this.matter.add.rectangle(400, 580, 800, 40, {
      isStatic: true,
    });

    // 토끼 생성
    this.rabbit = this.matter.add.rectangle(400, 500, 40, 60, {
      restitution: 0.1, // 약간 튕김
    });

    // 점프 키 이벤트
    this.input.keyboard?.on('keydown-SPACE', () => {
      const velocity = this.rabbit?.velocity;

      if (velocity && Math.abs(velocity.y) < 1) {
        this.matter.body.setVelocity(this.rabbit, { x: 0, y: -10 });
        // this.sound.play('jump'); // 점프 효과음
      }
    });
  }

  startGame() {
    currentState = GameState.Play;
    startText.setVisible(false);
    retryText.setVisible(false);

    console.log('게임 시작됨');
  }

  gameOver() {
    currentState = GameState.Die;
    retryText.setVisible(true);
    console.log('게임 오버');
  }

  update() {
    if (currentState === GameState.Play) {
      // 게임 중 로직
    }
  }
}
