export type VegetableType = {
  name: string;
  key: string;
  texture: string;
  radius: number;
  mass: number;
  speed: number;
  bounce: number;
  // 새로 추가된 속성들
  density?: number; // 밀도 (물리 계산에 영향)
  angularDamping?: number; // 회전 감쇠
  frictionAir?: number; // 공기 저항
};

export const vegetableTypes: VegetableType[] = [
  {
    name: '수박',
    key: 'watermelon',
    texture: 'watermelon',
    radius: 50,
    mass: 3,
    speed: 2,
    bounce: 0.4, // 더 잘 튀도록 증가
    density: 1.2,
    angularDamping: 0.05,
    frictionAir: 0.001,
  },
  {
    name: '옥수수',
    key: 'corn',
    texture: 'corn',
    radius: 20,
    mass: 0.4,
    speed: 5,
    bounce: 0.6, // 잘 튀는 특성
    density: 0.8,
    angularDamping: 0.02,
    frictionAir: 0.002,
  },
  {
    name: '고추',
    key: 'chili',
    texture: 'chili',
    radius: 16,
    mass: 0.2,
    speed: 6,
    bounce: 0.5,
    density: 0.6,
    angularDamping: 0.01,
    frictionAir: 0.001,
  },
  {
    name: '파프리카',
    key: 'paprika',
    texture: 'paprika',
    radius: 28,
    mass: 0.8,
    speed: 4,
    bounce: 0.6,
    density: 0.9,
    angularDamping: 0.03,
    frictionAir: 0.002,
  },
  {
    name: '가지',
    key: 'eggplant',
    texture: 'eggplant',
    radius: 30,
    mass: 1.2,
    speed: 3,
    bounce: 0.4,
    density: 1.0,
    angularDamping: 0.04,
    frictionAir: 0.001,
  },
  {
    name: '양배추',
    key: 'cabbage',
    texture: 'cabbage',
    radius: 42,
    mass: 2.0,
    speed: 2.5,
    bounce: 0.3, // 무거워서 덜 튐
    density: 1.1,
    angularDamping: 0.06,
    frictionAir: 0.003,
  },
  {
    name: '브로콜리',
    key: 'broccoli',
    texture: 'broccoli',
    radius: 30,
    mass: 1.0,
    speed: 3.5,
    bounce: 0.7, // 가장 잘 튐
    density: 0.7,
    angularDamping: 0.02,
    frictionAir: 0.001,
  },
  {
    name: '양파',
    key: 'onion',
    texture: 'onion',
    radius: 28,
    mass: 1.0,
    speed: 3.8,
    bounce: 0.5,
    density: 0.9,
    angularDamping: 0.03,
    frictionAir: 0.002,
  },
  {
    name: '오이',
    key: 'cucumber',
    texture: 'cucumber',
    radius: 25,
    mass: 0.5,
    speed: 5,
    bounce: 0.4,
    density: 0.8,
    angularDamping: 0.02,
    frictionAir: 0.001,
  },
  {
    name: '토마토',
    key: 'tomato',
    texture: 'tomato',
    radius: 22,
    mass: 0.3,
    speed: 5,
    bounce: 0.8, // 토마토는 잘 터지지만 게임에서는 잘 튀게
    density: 0.6,
    angularDamping: 0.01,
    frictionAir: 0.001,
  },
];
