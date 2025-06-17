import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#d0f4f7',
  physics: {
    default: 'arcade', // 이후 matter로 바꿀 예정
    arcade: {
      gravity: {
        y: 0,
        x: 0,
      },
    },
  },
  scene: [GameScene],
};

new Phaser.Game(config);
