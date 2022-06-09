import React from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native"

// 화면 크기를 받아옴
// ES6. width값을 가져온 후 이름을 SCREEN_WIDTH로 바꿈
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
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