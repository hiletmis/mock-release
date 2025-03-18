export const randomNum = (min: number, max: number) => {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

export const one = 1;
export const two = 2;
export const three = 3;
export const four = 4;
export const five = 5;