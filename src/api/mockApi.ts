export function fakeRequest(): Promise<void> {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 500) + 300;

    setTimeout(() => {
      const failed = Math.random() < 0.15;

      if (failed) {
        reject(new Error("Request failed"));
      } else {
        resolve();
      }
    }, delay);
  });
}