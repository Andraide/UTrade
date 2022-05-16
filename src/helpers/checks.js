import { RESULTS } from 'react-native-permissions';
  
export function checkResult(result) {
    var checkStatus = false;
    switch (result) {
        case RESULTS.GRANTED:
          checkStatus = true;
          break;
        case RESULTS.DENIED:
          checkStatus = false;
          break;
        case RESULTS.BLOCKED:
          checkStatus = false;
          break;
        case RESULTS.UNAVAILABLE:
          checkStatus = false;
          break;
      }
    return checkStatus;
}