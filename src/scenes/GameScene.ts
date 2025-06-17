import Phaser from 'phaser';
import { vegetableTypes } from '../data/vegetables';

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
    // 모든 채소 이미지 preload
    vegetableTypes.forEach((v) => {
      this.load.image(v.texture, `/assets/${v.texture}.png`);
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#d0f4f7');

    // 중력 설정 (매우 중요!)
    this.matter.world.engine.world.gravity.y = 0.4;

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

    // 바닥 생성 (기울어진 바닥)
    this.createTerrain();

    // 토끼 생성
    this.createRabbit();

    // 점프 입력
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (currentState === GameState.Play) {
        this.rabbit.setVelocityY(-8); // 언제든지 점프 가능
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

    // 충돌 이벤트
    this.matter.world.on('collisionstart', (event) => {
      for (const pair of event.pairs) {
        const a = pair.bodyA.gameObject;
        const b = pair.bodyB.gameObject;

        if (!a || !b) continue;

        const isRabbit = a === this.rabbit || b === this.rabbit;
        const isVeg = a?.getData('type') === 'vegetable' || b?.getData('type') === 'vegetable';

        if (isRabbit && isVeg) {
          const vegName = a?.getData('name') || b?.getData('name');
          console.log(`당신은 ${vegName}에게 당했습니다!`);
          this.gameOver();
        }
      }
    });
  }

  startGame() {
    currentState = GameState.Play;
    startText.setVisible(false);
    retryText.setVisible(false);

    // 기존 채소들 제거
    this.matter.world.getAllBodies().forEach((body) => {
      if (body.gameObject?.getData('type') === 'vegetable') {
        body.gameObject.destroy();
      }
    });

    // 토끼 위치와 상태 초기화
    if (this.rabbit) {
      this.rabbit.setPosition(150, 450);
      this.rabbit.setVelocity(0, 0);
      this.rabbit.setAngularVelocity(0);
    }

    console.log('게임 시작');
  }

  gameOver() {
    currentState = GameState.Die;
    retryText.setVisible(true);
    console.log('게임 오버');
  }

  createRabbit() {
    this.rabbit = this.matter.add.image(150, 450, 'rabbit'); // Y 위치를 바닥 근처로 조정
    this.rabbit.setFixedRotation();
    this.rabbit.setFriction(0.3); // 마찰력 증가로 미끄러짐 방지
    this.rabbit.setFrictionAir(0.05); // 공기저항 증가로 점프 제한
    this.rabbit.setBounce(0.1); // 바운스 감소
    this.rabbit.setData('type', 'rabbit');
  }

  createVegetable() {
    const type = Phaser.Utils.Array.GetRandom(vegetableTypes);
    const MatterLib = Phaser.Physics.Matter.Matter;
    const { Bodies, Body } = MatterLib;

    // 더 복잡한 Compound body 생성 (통통 튀는 효과)
    const mainRadius = type.radius;
    const parts = [
      // 메인 원형 몸체
      Bodies.circle(0, 0, mainRadius),
      // 불규칙한 돌출부들 (통통 튀는 효과를 위해)
      Bodies.circle(-mainRadius * 0.6, -mainRadius * 0.3, mainRadius * 0.3),
      Bodies.circle(mainRadius * 0.6, -mainRadius * 0.3, mainRadius * 0.3),
      Bodies.circle(-mainRadius * 0.3, mainRadius * 0.6, mainRadius * 0.25),
      Bodies.circle(mainRadius * 0.3, mainRadius * 0.6, mainRadius * 0.25),
      // 작은 사각형 추가 (더 불규칙한 굴림을 위해)
      Bodies.rectangle(0, 0, mainRadius * 0.8, mainRadius * 0.2),
      Bodies.rectangle(0, 0, mainRadius * 0.2, mainRadius * 0.8),
    ];

    const compound = Body.create({
      parts,
      mass: type.mass,
    });

    const veg = this.matter.add.image(0, 0, type.texture);
    veg.setExistingBody(compound);

    // 화면 바깥에서 등장
    const spawnX = 750;
    const spawnY = Phaser.Math.Between(200, 400);

    veg.setPosition(spawnX, spawnY);
    veg.setOrigin(0.5);

    // 물리 속성 설정 (통통 튀는 효과)
    veg.setFriction(0.1);
    veg.setFrictionAir(0.001); // 공기저항 최소화
    veg.setBounce(type.bounce + 0.3); // bounce 값 증가
    veg.setMass(type.mass);
    veg.setVelocityX(-type.speed);

    // 초기 회전 속도 (더 역동적으로)
    veg.setAngularVelocity(Phaser.Math.FloatBetween(-0.2, -0.4));

    veg.setData('type', 'vegetable');
    veg.setData('name', type.name);

    // 화면 밖으로 나가면 제거 (왼쪽으로 나간 야채들)
    this.time.delayedCall(10000, () => {
      if (veg.active) {
        veg.destroy();
      }
    });

    // 왼쪽으로 나간 야채들을 주기적으로 체크해서 제거
    const checkBounds = () => {
      if (veg.active && veg.x < -100) {
        veg.destroy();
      } else if (veg.active) {
        this.time.delayedCall(100, checkBounds);
      }
    };
    this.time.delayedCall(100, checkBounds);
  }

  createTerrain() {
    // 기울어진 바닥들 생성
    this.matter.add.rectangle(200, 580, 400, 40, {
      isStatic: true,
      label: 'ground1',
      friction: 0.3,
      restitution: 0.8, // 높은 반발력
      angle: Phaser.Math.DegToRad(5), // 5도 기울임
    });

    this.matter.add.rectangle(600, 580, 400, 40, {
      isStatic: true,
      label: 'ground2',
      friction: 0.3,
      restitution: 0.8,
      angle: Phaser.Math.DegToRad(-3), // -3도 기울임
    });

    // 왼쪽 벽 제거 (야채가 왼쪽으로 나갈 수 있도록)
    // 오른쪽 벽만 유지
    this.matter.add.rectangle(810, 300, 20, 600, {
      isStatic: true,
      label: 'rightWall',
    });
  }

  update() {
    if (currentState === GameState.Play) {
      // 토끼가 화면 밖으로 떨어지면 게임 오버
      if (this.rabbit && this.rabbit.y > 650) {
        this.gameOver();
      }

      // 토끼가 왼쪽으로 너무 많이 이동하면 원래 위치로 되돌림
      if (this.rabbit && this.rabbit.x < 50) {
        this.rabbit.setX(150);
      }
    }
  }
}
