class ParticleSystem {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
      this.gravity = createVector(0, 0.05); // 중력
      this.wind = createVector(0.1, 0);  // 바람
      this.gravity = createVector(0, 0.05); // 시스템의 중력
    }
  
    // addParticle() {
    //   this.particles.push(new Particle(this.origin.x, this.origin.y));
    // }
  
    run() {
        for (let p of this.particles) {
          p.applyForce(this.gravity); // 중력 적용
          p.update();
          p.display();
        }
      }
    }
        
//         // 중력과 바람을 각 파티클에 적용
//         p.applyForce(this.gravity);
//         p.applyForce(this.wind);
        
//         p.update();
//         p.display();
        
//         if (p.isDead()) {
//           this.particles.splice(i, 1);
//         }
//       }
//     }
      