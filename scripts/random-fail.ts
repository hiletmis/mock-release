
const random = Math.random();

console.log('Random:', random);
if (random < 0.5) {
    throw new Error('Random error');
}
