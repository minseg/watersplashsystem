let wind = createVector(0.1, 0); // 가벼운 바람


class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 0));
      this.acceleration = createVector(0, 0); // 중력은 외부에서 적용
      this.lifespan = 255;
      this.gravity = createVector(0, 0.05); // 중력
    }
  
    // 외부에서 힘을 적용할 수 있도록 함수 분리
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    applyGravity() {
        this.applyForce(this.gravity); // 중력 적용
      }
    
    update() {
      this.applyGravity(); // 중력 적용
      this.applyForce(this.gravity);
      this.applyForce(wind); // 바람 적용
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);  // 가속도를 리셋
      this.lifespan -= 2;
    }
  
    display() {
      fill(0, 100, 255, this.lifespan); // 물 색상 표현
      noStroke();
      ellipse(this.position.x, this.position.y, 10, 10);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
 
  