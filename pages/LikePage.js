import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, ScrollView} from 'react-native';
import LikeCard from '../components/LikeCard';
import {firebase_db} from "../firebaseConfig";
import Constants from 'expo-constants';
import NoLikes from '../components/NoLikes';

export default function LikePage({navigation, route}) {
    let user_id = Constants.installationId

    const [tip,setTip] = useState([])
    const [ready,setReady] = useState(true)

    useEffect(()=>{
        navigation.setOptions({
            title:"내가 찜한 꿀팁"
        })
        firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
            console.log("파이어베이스에서 데이터를 가져왔습니다!!")
            let tip = snapshot.val();
            console.log(tip)
            let tip_list = Object.values(tip)
            if(tip_list.length > 0){  //length가 0이면 false이고 0이 아니면 true이기 때문에 배열에 값이 없는 경우 if문이 실행이 안됨
                setTip(tip_list)
                setReady(false)
            }
            })
    }, [])
    
    const reload = () => {
        const user_id = Constants.installationId;
        firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
            console.log("파이어베이스에서 데이터 가져왔습니다!!")
            let tip = snapshot.val();
            console.log(tip)
            let tip_list = Object.values(tip)

            if(tip_list.length > 0){
                setTip(tip_list)
            }
        })
    }

    return ready ? <NoLikes/> : (
      <ScrollView>
         {
             tip.map((content,i)=>{
                 return(<LikeCard key={i} reload={reload} content={content} navigation={navigation}/>)
             })
         }
      </ScrollView>
  )
}

const style = StyleSheet.create({
	
})