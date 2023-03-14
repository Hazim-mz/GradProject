import axios from 'axios';
import { useState } from 'react'

import { db, auth } from '../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { getAuth, sendEmailVerification } from 'firebase/auth';

const API_KEY = 'AIzaSyDwVQ_iYQOWJcr_b4WUdLu1WpaeSg15uNg';

async function sendVerification(mode, token) {
  //console.log(mode, token);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  var response = await axios.post(url, {
    requestType: "VERIFY_EMAIL",
    idToken: token.idToken,
  });
  console.log(response);

  // const auth = getAuth();
  // console.log(auth.currentUser);
  // await sendEmailVerification(auth.currentUser)  
  // .then(() => {
  //   console.log('send');
  // });
}
async function confirmVerification(mode, oobCode) {
  //console.log(mode, oobCode);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  var response ;

  response = await axios.post(url, {
    oobCode: oobCode,
  });
  
  //console.log(response.data);
  return response.data.emailVerified;
}

async function authenticate(mode, email, password, name, record, rule) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  //console.log(response.data);
  const temp = response.data;
  var token ;

  if(mode == 'signUp'){
    token = {...temp, 
      name: name,
      record: record,
      notificationsAddress: '',
      pass : password
    }
    //console.log(token);
    const UserID = await addDoc(collection(db, "Users"), {
      Name: token.name, 
      Email: token.email, 
      uID: token.localId,
      Record: token.record,
      Rule: -1,
      imageUrl: 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png',
      NotificationsAddress: ''
    })

    token = {...token, 
      userID: UserID.id,
      rule: -1,
      uID: token.localId,
      image: 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png',

    }
    sendVerification('sendOobCode', token);
  }
  else{
    const q = query(collection(db, "Users"), where("Email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      token = {...temp, 
        name: doc.data().Name,
        userID: doc.id ,
        uID: doc.data().uID,
        record: doc.data().Record,
        rule: doc.data().Rule,
        image: doc.data().imageUrl,
        notificationsAddress: doc.data().NotificationsAddress,
      }
    });
    if(token.rule == -1){
      token = {...token, 
        pass : password
      }
      sendVerification('sendOobCode', token);
    }else{
      token = {...token, 
        pass : ''
      }
    }

  }
  //console.log(token);

  return token;
}

async function updateauthenticate(mode, idToken, email, password) {
  console.log(mode, idToken, email, password);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  var response ;
  if(email != 'updatePassword'){
    response = await axios.post(url, {
      idToken: idToken,
      email: email,
      returnSecureToken: true,
    });
  }else{
    response = await axios.post(url, {
      idToken: idToken,
      password: password,
      returnSecureToken: true,
    });
  }
  console.log(response.data);
  return response.data;
}


export function createUser(email, password, name, record, rule) {
  return authenticate('signUp', email, password, name, record, rule);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

export function updateEmail(idToken, email) {
  return updateauthenticate('update', idToken, email);
}
export function updatePassword(idToken, password) {
  return updateauthenticate('update', idToken, 'updatePassword', password);
}

export function confirmEmailVerification(oobCode) {
  return confirmVerification('update', oobCode);
}