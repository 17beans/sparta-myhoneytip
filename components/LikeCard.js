import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity, Alert} from 'react-native'
import {firebase_db} from "../firebaseConfig";
import Constants from 'expo-constants';

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function LikeCard({content,navigation,reload}){
    const user_id = Constants.installationId;

    const detail = () => {
      navigation.navigate('DetailPage',{idx:content.idx})
    }

    const remove = () => {
        firebase_db.ref('/like/'+user_id+'/'+content.idx).remove().then(function(){
          Alert.alert("찜 해제 완료!");
          // navigation.navigate('LikePage')
          reload()
        })
    }

    return(
        //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri:content.image}}/>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
                <Text style={styles.cardDate}>{content.date}</Text>
                <View style={styles.btnct}>
                  <TouchableOpacity style={styles.buttons} onPress={()=>detail()}><Text style={styles.btnText}>자세히 보기</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.buttons} onPress={()=>remove()}><Text style={styles.btnText}>찜 해제</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    },
    btnct:{
      flexDirection:"row"
    },
    buttons: {
      width:100,
      height:50,
      padding:13.5,
      borderColor:"deeppink",
      borderWidth:1,
      borderRadius:15,
      margin:10,
      marginBottom:0
    },
    btnText:{
      textAlign:"center",
      color:"deeppink"
    }
});