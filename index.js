/*
*
*  Jess adding a new comment!!!! Changes made ready to upload!
*
 */


import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('UWExplorer', () => App);

if (Platform.OS === 'web') {

  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('UWExplorer', { rootTag });

}
