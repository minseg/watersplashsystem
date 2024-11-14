let system;
let gravityStrength = 0.1;
let windStrength = 0.05;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, 50));
}

function draw() {
  background(51);

  // 마우스가 눌릴 때마다 파티클을 더 많이 생성
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      system.addParticle();
    }
  } else {
    system.addParticle();
  }

  // 중력과 바람 벡터 정의
  let gravity = createVector(0, gravityStrength);
  let wind = createVector(windStrength, 0);

  // 파티클 시스템에 중력과 바람을 적용
  system.applyForce(gravity);
  system.applyForce(wind);

  // 파티클 시스템 실행
  system.run();
}

// 키보드 입력에 따라 중력 및 바람의 세기를 조절
function keyPressed() {
  if (key === 'G') {
    gravityStrength += 0.05;
  } else if (key === 'g') {
    gravityStrength = max(0, gravityStrength - 0.05);
  } else if (key === 'W') {
    windStrength += 0.02;
  } else if (key === 'w') {
    windStrength = max(0, windStrength - 0.02);
  }
}
