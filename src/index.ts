export const randomNum = (min: number, max: number) => {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);
    const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    return random;
};
