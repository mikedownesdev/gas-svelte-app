import isJest from "../isJest";
export default function sleep(ms) {
  let milliseconds = ms || Math.floor(Math.random() * 2001) + 1000;
  return new Promise((resolve) =>
    setTimeout(resolve, isJest() ? 0 : milliseconds)
  );
}
