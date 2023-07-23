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
        resolve(JSON.parse(JSON.stringify(mockResponse)));
    },
    async setUserPreferences(preferencesObject) {
      console.log('going to sleep')
      await sleep(2000)
      console.log('Saved preferences ' + Array.from(arguments).toString());
      let mockResponse = preferencesObject;
      // console.log('Saved preferences ' + Array.from(arguments).toString());
      resolve(JSON.parse(JSON.stringify(mockResponse)));
    }
  };
}