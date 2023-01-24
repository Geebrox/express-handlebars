import fs from 'fs/promises';
import path from 'path';

const numbersPath = path.resolve(__dirname, 'numbers.json');

export const getNumbers = async () => {
  try {
    const data = await fs.readFile(numbersPath, { encoding: 'utf8' });
    return JSON.parse(data) as number[];
  } catch (err: any) {
    if ('code' in err && err.code === 'ENOENT') {
      await fs.writeFile(numbersPath, '[]', { encoding: 'utf8' });
    }

    return [];
  }
};

export const saveNumbers = (numbers: number[]) => {
  try {
    return fs.writeFile(numbersPath, JSON.stringify(numbers), {
      encoding: 'utf8',
    });
  } catch (err: any) {
    if ('code' in err && err.code === 'ENOENT') {
      return fs.writeFile(numbersPath, '[]');
    }

    return;
  }
};

export const addNumber = async (num: number) => {
  try {
    const numbers = await getNumbers();

    numbers.unshift(num);
    saveNumbers(numbers);

    return numbers;
  } catch {
    return [];
  }
};

export const getCalculatedNumbers = async () => {
  const numbers = await getNumbers();

  return numbers.reduceRight((prev, next, idx) => {
    const lastNumber = next;
    const prevNumber = numbers[idx + 1] || 0;
    const avgNumber = +((lastNumber + prevNumber) / 2).toFixed(2);
    prev.push({ lastNumber, prevNumber, avgNumber });
    return prev;
  }, [] as { lastNumber: number; prevNumber: number; avgNumber: number }[]);
};
