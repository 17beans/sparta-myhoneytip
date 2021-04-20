import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from "expo-ads-admob";

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Card({ content, navigation }) {
  // content.idx 상태 관리 위한 상태 변수 생성
  // const [conidxState, setConidxState] = useState()

  useEffect(() => {
    // Card.js에 들어오자마자 전면 광고 준비하느라 useEffect에 설정
    //애드몹도 외부 API 이므로 실행 순서를 지키기위해 async/await 사용!
    //안드로이드와 IOS 각각 광고 준비 키가 다르기 때문에 디바이스 성격에 따라 다르게 초기화 시켜줘야 합니다.
    Platform.OS === "ios"
      ? AdMobInterstitial.setAdUnitID("ca-app-pub-3250959123650295/2568338921")
      : AdMobInterstitial.setAdUnitID("ca-app-pub-3250959123650295/1212493835");

    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
      console.log("interstitialDidFailToLoad");
      // console.log("====================")
      // console.log("====================")
      // console.log(conidxState)
      // 그리고 특이한 점을 또 하나 발견했는데 "console.log("interstitialDidFailToLoad")"이 부분을 console.log("interstitialDidFailToLoad222")로 바꾸고 DetailPage 넘어가는 것을 테스트를 해보고 다시 원상복구 해서 테스트 해봤는데 222를 추가 했을 땐 안보였다가 다시 지웠을 때 보이는 현상이 있는데 혹시 참고가 되실지 몰라 적어 놓습니다!!
      console.log("FailToLoad 부분의 idx 값: " + content.idx);
      console.log("====================");
      console.log("====================");
      goDetail();
    });
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      //   //광고가 끝나면 다음 코드 줄이 실행!
      // console.log("interstitialDidClose")
      // console.log("====================")
      // console.log("====================")
      // console.log(content.idx)
      navigation.navigate("DetailPage", { idx: content.idx });

      // 튜터님 필독!!
      // 현재 정책상 문제가 없는데도 광고가 나오지않는 현상이 있어interstitiaDidFailToLoad 부분에서 작업을 해야 합니다.
      // 제가 시도 하던건 삭제 또는 주석처리 해놓았습니다!
    });
  }, []);
  //   const [DtpState, setDtpState] = useState({})
  //   const Dtp = (DtpState) => {
  //     if(DtpState == content.idx){
  //       console.log("====================")
  //       console.log(DtpState)
  //       console.log(content.idx)
  //       navigation.navigate('DetailPage', {idx:DtpState})
  //     }else{
  //       console.log("====================")
  //       console.log(DtpState)
  //       console.log(content.idx)
  //     }
  // }

  const goDetail = () => {
    navigation.navigate("DetailPage", { idx: content.idx });
  };

  const goAdsNDetail = async () => {
    // await setconidxState(content.idx)
    // await console.log(setconidxState)
    // console.log("====================")
    // console.log("====================")
    // await console.log("goDetail() 부분의 idx 값: "+content.idx)
    // await console.log("====================")
    // await console.log("====================")
    // await goDetail()
    await navigation.navigate("DetailPage", { idx: content.idx });
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
    // await navigation.navigate('DetailPage',{idx:content.idx})

    // 카드를 눌렀을 때 해당 카드에 대한 인덱스를 불러와서 State 값에 들어가고 State 값이 바뀌게 되면 해당 인덱스 값에 해당하는 DetailPage로 이동
  };

  return (
    //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // let {conidx} = content.idx
        goAdsNDetail();
        // navigation.navigate('DetailPage', {idx:content.idx})
      }}
    >
      <Image style={styles.cardImage} source={{ uri: content.image }} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {content.title}
        </Text>
        <Text style={styles.cardDesc} numberOfLines={3}>
          {content.desc}
        </Text>
        <Text style={styles.cardDate}>{content.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardDesc: {
    fontSize: 15,
  },
  cardDate: {
    fontSize: 10,
    color: "#A6A6A6",
  },
});
