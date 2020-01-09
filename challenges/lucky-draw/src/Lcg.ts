class Lcg {
  seed: number;
  a: number;
  c: number;
  m: number;
  constructor(
    seed: number = Date.now(),
    a: number = 1664525,
    c: number = 1013904223,
    m: number = Math.pow(2, 32)
  ) {
    this.seed = seed;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  setSeed = (seed: number) => {
    this.seed = seed;
  };

  nextInt() {
    this.seed = (this.seed * this.a + this.c) % this.m;
    return this.seed;
  }

  nextFloat() {
    return this.nextInt() / this.m;
  }
}

export default Lcg;
