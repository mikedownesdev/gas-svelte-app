import isJest from './isJest';
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, isJest() ? 0 : ms));
}

export default function getMocks(resolve) {
  return {
    async getUserPreferences() {
        await sleep(1500);
        let mockResponse = {
          firstName: 'John',
          lastName: 'Mock'
        }
        resolve(JSON.stringify(mockResponse));
    },
    saveUserPreferences() {
      resolve('Saved preferences ' + Array.from(arguments).toString());
    }
  };
}
 