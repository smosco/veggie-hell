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
  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('preload');
  }

  create() {
    console.log('create');

    this.cameras.main.setBackgroundColor('#d0f4f7');

    // 시작 텍스트
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

    // 리트라이 텍스트 (처음엔 숨김)
    retryText = this.add
      .text(310, 280, '다시하기', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#555',
        padding: { x: 12, y: 6 },
      })
      .setInteractive()
      .setVisible(false);

    retryText.on('pointerdonw', () => {
      this.startGame();
    });
  }

  startGame() {
    currentState = GameState.Play;
    startText.setVisible(false);
    retryText.setVisible(false);

    console.log('게임 시작됨');
    // 이후 게임 본격 시작 로직은 여기에
  }

  gameOver() {
    currentState = GameState.Die;
    retryText.setVisible(true);
    console.log('게임 오버');
  }

  update() {
    if (currentState === GameState.Play) {
      // 추후 로직 설정
    }
  }
}
