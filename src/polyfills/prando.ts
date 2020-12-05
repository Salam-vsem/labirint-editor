import * as random from 'random';

export default class Prando {
  nextInt(min: number, max: number) {
    console.log(`nextInt(${min}, ${max})`);
    return random.int(min, max);
  }
}

var module: any
module.exports = Prando;
