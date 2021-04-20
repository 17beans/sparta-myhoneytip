import React, { useEffect } from 'react';
//import main from './assets/main.png';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
export default function AboutPage({navigation, route}) {
    const instalink = () => {
        Linking.openURL("https://www.instagram.com/choi.iad")
    }

    useEffect(()=>{
        navigation.setOptions({
            title:"소개 페이지",
            headerStyle:{
                backgroundColor: 'navy',
                shadowColor: 'navy',
            },
            headerTintColor: '#fff',
        })
    }, [])

    return (
    // <Image style={style.mainImage} source={{uri:''}}></Image>
    //  style={style.test}
    <View style={style.wrap}>
        <StatusBar style="light"></StatusBar>
        <Text style={style.mainTitle}>HI! 스파르타코딩 앱개발 반에 오신것을 환영합니다</Text>
        
        <View style={style.ct}>
            <Image style={style.mainImage} source={{uri:'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2FaboutImage.png?alt=media&token=13e1c4f6-b802-4975-9773-e305fc7475c4'}}></Image>
            <Text style={style.title}>많은 내용을 간결하게 담아내려 노력했습니다!</Text>
            <Text style={style.comment}>꼭 완주 하셔서 꼭 여러분것으로 만들어가시길 바랍니다</Text>
            <TouchableOpacity style={style.button} onPress={()=>instalink()}>
                <Text style={style.btnText}>여러분의 인스타계정</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    wrap:{
        marginTop:-1,
        paddingTop:20,
        backgroundColor:"navy",
        width:"100%",
        height:"100%",

    },
    mainTitle:{
        textAlign:"center",
        color:"white",
        marginTop:40,
        fontSize:24,
        fontWeight:"bold",
        
    },
    ct:{
        backgroundColor:"white",
        borderRadius:30,
        margin:30,
        padding:30,
        paddingVertical:60,
        
    },
    mainImage:{
        width:100,
        height:100,
        alignSelf:"center",
        borderRadius:30,

    },
    title:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:18,

    },
    comment:{
        marginTop:20,
        textAlign:"center",

    },
    button:{
        borderRadius:15,
        backgroundColor:"orange",
        alignSelf:"center",
        width:150,
        height:50,
        marginTop:20,

    },
    btnText:{
        flex:1,
        textAlign:"center",
        color:"white",
        flexDirection:"column",
        marginVertical:15,
        fontWeight:"bold",

    },
})