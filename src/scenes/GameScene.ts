import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('preload');
  }

  create() {
    console.log('create');
    this.add.text(300, 250, '채소 지옥 테스트', {
      fontSize: '24px',
      color: '#333',
    });
  }

  update() {
    // 추후 로직 설정
  }
}
