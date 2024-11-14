let wind = createVector(0.1, 0); // 가벼운 바람


class Particle {
    constructor(position) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(random(-1, 1), random(-1, 0));
      this.position = position.copy();
      this.lifespan = 255;
      this.size = random(8, 16);             
      this.rotation = random(TWO_PI);        
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.lifespan -= 3;
      this.size *= 0.98;
      this.rotation += 0.05;
    }
  
    display() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      stroke(200, this.lifespan);
      fill(127, this.lifespan);
      ellipse(0, 0, this.size, this.size * 0.6); 
      pop();
    }
  
    isDead() {
      return this.lifespan < 0;
    }
  
    run() {
      this.update();
      this.display();
    }
  }
  