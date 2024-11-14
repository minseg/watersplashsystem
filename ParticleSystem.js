class ParticleSystem {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
      this.gravity = createVector(0, 0.05); // 중력
      this.wind = createVector(0.1, 0);  // 바람
    }
  
    addParticle() {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  
    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        
        // 중력과 바람을 각 파티클에 적용
        p.applyForce(this.gravity);
        p.applyForce(this.wind);
        
        p.update();
        p.display();
        
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
  