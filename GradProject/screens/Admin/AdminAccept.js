import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useEffect, useState, useContext } from "react";

import { Colors } from "../../constants/styles";
import {AuthContext} from '../../store/auth-context';
import AcceptList from "../../components/AcceptCom/AcceptList";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';


function AdminAccept({navigation}) {
  const userAccountCtx = useContext(AuthContext);
  const [owners, setOwners] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(()=>{
    const q = query(collection(db, "Users"), where("Rule", "==", 0.5));
    onSnapshot(q, (Owners) =>{
        setOwners(Owners.docs.map((Owner) =>({
                id: Owner.id,
                data: Owner.data()
            }))
        )
    });
    if(userAccountCtx.isAuthenticated){
      const qqqq = query(collection(db, "MessagesRequest"), where('OwnerID', '==', userAccountCtx.userID));
      onSnapshot(qqqq, (Owners) =>
        setChats(Owners.docs.map((Owner) =>({
                  id: Owner.id,
                  data: Owner.data()
              }))
          )
      );
  }
  }, []);
  

  async function AcceptNewOwners(id){
    const docRef = doc(db, "Users", id);
  
    await updateDoc(docRef, {
        Rule: 1
    });
  }
  async function RejectNewOwners(id){

    var chat = chats.filter(item => item.id === ownerID);
  
    const ChatID = await addDoc(collection(db, "MessagesRequest"), {
        OwnerID: userAccountCtx.userID,
        Start: true,
        UserID: id,
        NewOwnerMes: 0,
        NewUserMes: 0,
        TimeOfLastMes: serverTimestamp(),
        LastMessage: '',
    })

    navigation.navigate('Chat', {
        chatId: ChatID.id,
        chatReceiverInfo: [{id: id}],
        chatStart: true,
        chatUserID: userAccountCtx.userID,
        chatUserEmail: userAccountCtx.email,
        chatUserImage: userAccountCtx.image,
        chatUserRule: userAccountCtx.rule,
    })

    const docRef = doc(db, "Users", id);
  
    await updateDoc(docRef, {
        Rule: 0.25
    });

  }

  if(owners.length != 0){
    return (
      // <View style={styles.container}>
      //   <ScrollView style={{flex: 1}}>
      //     {owners.map(accountMapper)}
      //   </ScrollView>
      // </View>
      <AcceptList Owners={owners} Accept={AcceptNewOwners} Reject={RejectNewOwners}/>
    );
  }else{
    return (
      <View style={styles.noOwnercontainer}>
        <Text style={styles.noOwnerText}>There No New Owners</Text>
      </View>
    );
  }


}

export default AdminAccept;

const styles = StyleSheet.create({
  noOwnercontainer:{
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noOwnerText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  container:{
    flex: 1
  },
  cardi: {
    margin: "2%",
    borderWidth: 1,
    backgroundColor: Colors.lightgrey,
    borderRadius: 10,
    paddingLeft: 3,
  },
  textspace: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    margin: 3,
  },
  buttonspace: {
    flexDirection: "row",
    marginLeft: "40%",
    // backgroundColor: "black",
  },
  dirc: {
    flexDirection: "row",
    margin: 3,
  },
  Allspace: {
    flex: 4,
  },
  green: {
    backgroundColor: "green",
  },
  red: {
    backgroundColor: "red",
  },
  button1: {
    marginLeft: 15,
    padding: 2,
    height: 55,
    width: "40%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
