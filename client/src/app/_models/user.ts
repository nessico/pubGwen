export interface User {
  username: string;
  token: string;
  photoUrl: string;
}

// ----------- Demonstration
// // data could be a string or a number
// let data: number | string = 42;

// data = '10';

// // 1: objects aren't consistent so you make a interface called Car and then implement it and it creates type safety
// // TopSpeed? ? makes it optional

// interface Car {
//   color: string;
//   model: string;
//   topSpeed?: number;
// }

// const car1: Car = {
//   color: 'blue',
//   model: 'BMW',
// };

// const car2: Car = {
//   color: 'red',
//   model: 'Mercedes',
//   topSpeed: 100,
// };

// const multiply = (x: number, y: number): void => {
//   x * y;
// };
