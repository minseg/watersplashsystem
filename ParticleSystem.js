class ParticleSystem {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
    }
  
    addParticle() {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  
    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.update();
        p.display();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }