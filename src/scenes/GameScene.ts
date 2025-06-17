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
  private rabbit!: Phaser.Physics.Matter.Image;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('rabbit', '/assets/rabbit.png');
    this.load.image('carrot', '/assets/carrot.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#d0f4f7');

    // 시작 버튼
    startText = this.add
      .text(300, 280, '게임 시작', {
        fontSize: '28px',
        color: '#222',
        backgroundColor: '#fff',
        padding: { x: 16, y: 8 },
      })
      .setInteractive();

    startText.on('pointerdown', () => this.startGame());

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

    retryText.on('pointerdown', () => this.startGame());

    // 바닥 생성
    this.createTerrain();

    // 토끼 생성
    this.createRabbit();

    // 점프 입력
    this.input.keyboard?.on('keydown-SPACE', () => {
      const velocity = this.rabbit?.body?.velocity;

      if (velocity && Math.abs(velocity.y) < 1) {
        this.rabbit.setVelocityY(-10);
      }
    });

    // 채소 반복 생성
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        if (currentState === GameState.Play) {
          this.createVegetable();
        }
      },
      loop: true,
    });

    // 충돌 이벤트 등록 (단 한 번만)
    // TODO: matterCollision 플러그인 설치
    this.matter.world.on('collisionstart', (event) => {
      for (const pair of event.pairs) {
        const a = pair.bodyA.gameObject;
        const b = pair.bodyB.gameObject;

        if (!a || !b) continue;

        const isRabbit = a === this.rabbit || b === this.rabbit;
        const isVeg = a.getData('type') === 'vegetable' || b.getData('type') === 'vegetable';

        if (isRabbit && isVeg) {
          console.log('충돌!');
          this.gameOver();
        }
      }
    });

    this.createTerrain();
  }

  startGame() {
    currentState = GameState.Play;
    startText.setVisible(false);
    retryText.setVisible(false);

    console.log('게임 시작');
  }

  gameOver() {
    currentState = GameState.Die;
    retryText.setVisible(true);

    console.log('게임 오버');
  }

  createRabbit() {
    this.rabbit = this.matter.add.image(400, 500, 'rabbit');
    this.rabbit.setFixedRotation();
    this.rabbit.setFriction(0.01);
    this.rabbit.setBounce(0);
    this.rabbit.setData('type', 'rabbit');
  }

  createVegetable() {
    const veg = this.matter.add.image(850, 520, 'carrot');
    veg.setCircle(32); // 적절한 반지름
    veg.setFriction(0.005);
    veg.setBounce(0.2);
    veg.setMass(0.5);
    veg.setVelocityX(-10);
    veg.setData('type', 'vegetable');
  }

  createTerrain() {
    const terrainGroup: MatterJS.BodyType[] = [];

    // 기본 평지
    const flat = this.matter.add.rectangle(400, 580, 800, 40, {
      isStatic: true,
      label: 'flat',
      friction: 0.01,
    });
    terrainGroup.push(flat);

    // TODO: 각 구간마다 서로 다른 지형
  }

  update() {
    if (currentState === GameState.Play) {
      // 게임 중 로직
    }
  }
}
