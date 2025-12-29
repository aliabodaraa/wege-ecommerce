const delay = Math.floor(Math.random() * 1000) + 1000;
export const makeRandomDelay = (delay?: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});
