let system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, 50));
}

function draw() {
  background(51);
  system.addParticle();
  system.run();
}

// 간단한 Particle 클래스
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);  // 중력 역할
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

// Particle의 동작을 관리하는 메서드
Particle.prototype.run = function() {
  this.update();
  this.display();
};

// 위치 업데이트 메서드
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration); // 가속도를 속도에 추가
  this.position.add(this.velocity);     // 속도를 위치에 추가
  this.lifespan -= 2;                   // 수명 감소
};

// 화면에 파티클을 그리는 메서드
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// 파티클의 수명이 다했는지 확인하는 메서드
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};

// ParticleSystem 클래스
let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

// 새로운 파티클을 추가하는 메서드
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

// 외부 힘을 모든 파티클에 적용하는 메서드
ParticleSystem.prototype.applyForce = function(force) {
  for (let particle of this.particles) {
    particle.applyForce(force);
  }
};

// 모든 파티클을 업데이트하고 화면에 표시하는 메서드
ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);  // 수명이 다한 파티클을 제거
    }
  }
};
