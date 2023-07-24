import getMocks from './mocks/getMocks';
let polyfilled = false;
export default async function polyfillScriptRun() {
  if (polyfilled) return;
  polyfilled = true;
  const _window =
    'undefined' !== typeof window
      ? window
      : 'undefined' !== typeof globalThis
      ? globalThis
      : {};
  const google = _window?.google || {};
  _window.google = google;

  if (!google.script || !google.script.run) {
    let mocks = {};
    google.script = google.script || {};
    google.script.run = {
      withSuccessHandler: (resolve) => {
        mocks = getMocks(resolve);
        return {
          withFailureHandler: () => ({
            ...mocks,
          }),
        };
      },
    };
  }
}
