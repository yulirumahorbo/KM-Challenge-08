import {View, Text, Animated} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../helpers/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import Easing from 'react-native/Libraries/Animated/Easing';

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

// import {View, Text, Animated} from 'react-native';
// import React, {useState} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import colors from '../../helpers/colors';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {moderateScale} from 'react-native-size-matters';
// import Easing from 'react-native/Libraries/Animated/Easing';

// export default function HomeScreen() {
//   const opacity = useState(new Animated.Value(0))[0];

//   // function moveBall() {
//   //   Animated.timing(opacity, {
//   //     toValue: 1000,
//   //     duration: 1000,
//   //     useNativeDriver: false,
//   //   }).start();
//   // }

//   // function moveBallWithBack() {
//   //   Animated.timing(opacity, {
//   //     toValue: 1000,
//   //     duration: 1000,
//   //     useNativeDriver: false,
//   //     easing: Easing.back(),
//   //   }).start();
//   // }

//   // function moveWithSpringBall() {
//   //   Animated.spring(opacity, {
//   //     toValue: 300,
//   //     useNativeDriver: false,
//   //   }).start();
//   // }

//   function fadeInBall() {
//     Animated.timing(opacity, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }

//   function fadeOutBall() {
//     Animated.timing(opacity, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: colors.yellow,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Animated.View
//         style={{
//           borderRadius: moderateScale(50),
//           width: moderateScale(50),
//           height: moderateScale(50),
//           backgroundColor: 'red',
//           // marginLeft: leftValue,
//           opacity
//         }}
//       />
//       {/* <TouchableOpacity onPress={moveBall}>
//         <Text>Move me!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={moveBallWithBack}>
//         <Text>Move Ball With Back!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={moveWithSpringBall}>
//         <Text>Move With Spring Ball!</Text>
//       </TouchableOpacity> */}
//       <Text>Move me!</Text>
//       <TouchableOpacity onPress={fadeInBall}>
//         <Text>Fade In Ball!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={fadeOutBall}>
//         <Text>Fade Out Ball!</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }
