import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#d0f4f7',
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 1, // 중력 적용
      },
      debug: true, // 개발 중 충돌 디버그 보기
    },
  },
  scene: [GameScene],
};

new Phaser.Game(config);
