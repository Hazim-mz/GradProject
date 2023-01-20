import axios from 'axios';
import { useState } from 'react'

import { db } from '../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const API_KEY = 'AIzaSyDwVQ_iYQOWJcr_b4WUdLu1WpaeSg15uNg';


async function authenticate(mode, email, password, name, record, rule) {

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const temp = response.data;
  var token ;

  if(mode == 'signUp'){
    token = {...temp, 
      name: name,
      record: record,
      rule: rule
    }
    console.log(token);
    const UserID = await addDoc(collection(db, "Users"), {
      Name: token.name,
      Email: token.email,
      UserID: token.localId,
      Record: token.record,
      Rule: token.rule
    }).
    then(()=>{
    })
  }
  else{
    const q = query(collection(db, "Users"), where("Email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      token = {...temp, 
        name: doc.data().Name,
        record: doc.data().Record,
        rule: doc.data().Rule
      }
    });
  }
  //console.log(token);

  return token;
}


export function createUser(email, password, name, record, rule) {
  return authenticate('signUp', email, password, name, record, rule);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}