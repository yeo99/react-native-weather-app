import * as Location from 'expo-location';
import React from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native"
import { useState, useEffect } from "react";
// import { useEffect } from 'react/cjs/react.development';
// import { useState } from 'react/cjs/react.development';

// 화면 크기를 받아옴
// ES6. width값을 가져온 후 이름을 SCREEN_WIDTH로 바꿈
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  // 권한
  const ask = async() => {
    // requestPermissionsAsync는 deprecated, 대신 requestForegroundPermissionsAsync(앱 사용 중 일때만 위치를 사용)
    // granted는 object. 허용시 {"canAskAgain": bool, "expires": never, "granted": bool, "status": "granted"}
    const {granted} = await Location.requestForegroundPermissionsAsync();
    // 허용되지 않았다면 state변경
    if(!granted) {
      setOk(false);
    }

    // 위치. accuracy는 정확도를 지정(1~6)
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false}
    );

    // 불러온 객체에서 도시 이름을 City의 state값으로 변경
    setCity(location[0].city);
  }
  // 이 컴포넌트가 마운트 됐을 때
  useEffect(() => {
    ask();
  })
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      {/* - ScrollView is native scroll view provided by OS(customizable)
          - horizontal props를 추가하여 가로 스크롤이 되게끔
          - ScrollView의 스타일을 주고싶다면 style props를 사용하면 안된다
          - 대신 contentContainerStyle을 사용해야 한다
            - 스크롤이 안되는데, ScrollView 컴포넌트에는 flex를 줄 필요가 없기때문(스크롤이 화면보다 커야하기에)
          - 가로 스크롤을 했을 때, 슬라이더가 낭창(?)거리지 않게 딱딱 끊어지며 한 화면씩 보여줘야 한다.
            - ScrollView컴포넌트에 pagingEnabled props 사용(boolean, default: false)
            - pagingEnabled를 추가했더니 디스플레이 최 하단에 indicator가 생겼다.
              - showsHorizontalScrollIndicator props때문(boolean, default: true)
              - indicatorStyle props를 사용하면 indicator를 스타일링 할 수 있다(IOS only)
            
      */}
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// 너무 커지면 styles를 별도의 파일로 분기하자
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    // 이미 View가 flex이기에 가능
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    
  },
  day: {
    // width를 고정값으로 입력하면 AOS/IOS별로, 화면 크기별로 레이아웃이 변경되니까
    // 이를 막기 위해 RN의 Dimensions API를 import하여 width에 기기 가로크기를 적용
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
})