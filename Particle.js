class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 0));
      this.acceleration = createVector(0, 0); // 중력은 외부에서 적용
      this.lifespan = 255;
    }
  
    // 외부에서 힘을 적용할 수 있도록 함수 분리
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);  // 가속도를 리셋
      this.lifespan -= 2;
    }
  
    display() {
      fill(0, this.lifespan);
      noStroke();
      ellipse(this.position.x, this.position.y, 10, 10);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
 
  