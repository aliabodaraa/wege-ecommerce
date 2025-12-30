const delay = Math.floor(Math.random() * 100) + 100;
export const makeRandomDelay = (_delay: number = delay) =>
  new Promise((resolve) => setTimeout(resolve, _delay));

export const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});
