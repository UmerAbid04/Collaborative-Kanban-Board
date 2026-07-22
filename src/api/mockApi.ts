export async function fakeRequest() {
  const delay =
    Math.floor(Math.random() * 500) + 300;

  await new Promise((resolve) =>
    setTimeout(resolve, delay)
  );

  const failed = Math.random() < 0.15;

  if (failed) {
    throw new Error("Request failed");
  }
}