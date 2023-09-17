export default function sleep(milliseconds?: number): Promise<void> {
  let ms = milliseconds || Math.floor(Math.random() * 2001) + 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
