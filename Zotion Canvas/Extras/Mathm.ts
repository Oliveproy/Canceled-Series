type Inbetween = [number, number];

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isInbetween(value: unknown): value is Inbetween {
  return Array.isArray(value) && value.length === 2 && value.every(isNumber);
}

function Between(from: number, to: number): number;
function Between(inbetween: Inbetween): number;
function Between(infetween: Inbetween | number, to?: number): number {
  let min: number, max: number;
  if (isNumber(infetween)) {
    min = infetween;
    max = to!;
  } else if (isInbetween(infetween)) {
    min = infetween[0];
    max = infetween[1];
  } else {
    throw new TypeError('Invalid input');
  }
  return (Math.random() * (max - min)) + min;
}

export {Between }