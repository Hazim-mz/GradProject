import { View, Text, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../store/auth-context";
import CommentList from "../../components/OffensiveCommentCom/CommentList";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

function AdminComment() {
    const userAccountCtx = useContext(AuthContext);

    async function DeleteComment(id){

        await deleteDoc(doc(db, "Review", id));

    }
    async function IgnoreComment(id){
        const docRef = doc(db, "Review", id);
      
        await updateDoc(docRef, {
            Report: 0
        });
    }

    const [comments, setComments] = useState([]);
    const [halls, setHalls] = useState([]);

    useEffect(()=>{
      const q = query(collection(db, "Review"), where("Report", ">", 15));
      onSnapshot(q, (Comments) =>{
            setComments(Comments.docs.map((Comment) =>({
                  id: Comment.id,
                  data: Comment.data()
              }))
          )
      });
      const qq = query(collection(db, "Halls"));
      onSnapshot(qq, (Halls) =>{
            setHalls(Halls.docs.map((Hall) =>({
                  id: Hall.id,
                  data: Hall.data()
              }))
          )
      });
    }, []);
    if(comments.length != 0){
        return (
            <CommentList Comments={comments} Halls={halls} Delete={DeleteComment} Ignore={IgnoreComment}/>
        );
    }else{
        return (
            <View style={styles.noCommentcontainer}>
                <Text style={styles.noCommentText}>There No Offensive Comment</Text>
            </View>
        );

    }

}
  
export default AdminComment;
const styles = StyleSheet.create({
    noCommentcontainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noCommentText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
});
