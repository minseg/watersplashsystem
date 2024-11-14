let system;
let gravity;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, 50));
  gravity = createVector(0, 0.1);  // 초기 중력 설정
}

function draw() {
  background(51);
  
  // 마우스 위치에 따라 파티클 생성 위치 변경
  system.origin = createVector(mouseX, mouseY);

  // 중력 벡터 적용
  system.applyForce(gravity);

  // 파티클 생성 및 시스템 실행
  system.addParticle();
  system.run();
}

// Particle 클래스 정의
class Particle {
  constructor(position) {
    this.acceleration = createVector(0, 0);  // 초기 가속도는 0으로 설정
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255;
  }

  // 외부에서 힘을 받아 가속도에 적용하는 메서드
  applyForce(force) {
    this.acceleration.add(force);
  }

  // 파티클의 위치 업데이트 메서드
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);  // 가속도 리셋
    this.lifespan -= 2;
  }

  // 파티클을 화면에 그리는 메서드
  display() {
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  // 파티클의 수명이 다했는지 확인하는 메서드
  isDead() {
    return this.lifespan < 0;
  }

  // 파티클의 동작을 관리하는 메서드
  run() {
    this.update();
    this.display();
  }
}

// ParticleSystem 클래스 정의
class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  // 새로운 파티클을 추가하는 메서드
  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  // 외부 힘을 모든 파티클에 적용하는 메서드
  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  // 모든 파티클을 업데이트하고 화면에 표시하는 메서드
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);  // 수명이 다한 파티클 제거
      }
    }
  }
}

// 키보드 입력을 처리하여 중력의 강도 조절
function keyPressed() {
  if (key === 'W' || key === 'w') {
    gravity.y -= 0.1;  // 'W' 키를 누르면 중력 강도 증가
  }
  if (key === 'S' || key === 's') {
    gravity.y += 0.1;  // 'S' 키를 누르면 중력 강도 감소
  }
}
