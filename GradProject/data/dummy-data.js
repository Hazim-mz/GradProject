import Hall from '../models/Hall';

export const HALLS = [
  new Hall(
    1, 
    'AL SAMA', 
    20000, 
    25, 
    [{id:1, uri:require('../assets/images/hall.jpg')}, {id:2, uri:require('../assets/images/hall2.jpg')}], 
    'AAAAAAAAAAAAAAAA', 
    [{name:'teaBoy', isAvailable: true},{name:'Incense', isAvailable: false},{name:'Cooking', isAvailable: true}]//teaBoy, incense, cooking
  ),

  new Hall(
    2, 
    'AL ELA',
    24000, 
    44, 
    [{id:3, uri:require('../assets/images/hall.jpg')}, {id:4, uri:require('../assets/images/hall2.jpg')}], 
    'BBBBBBBBBBBBBBBBBBBBB', 
    [{name:'teaBoy', isAvailable: true},{name:'Incense', isAvailable: true},{name:'Cooking', isAvailable: true}]
  ),

  new Hall(
    3, 
    'AL BROT', 
    30000, 
    34, 
    [{id:5, uri:require('../assets/images/hall.jpg')}, {id:6, uri:require('../assets/images/hall2.jpg')}], 
    'CCCCCCCCCCCCCCCCCCCCCC', 
    [{name:'teaBoy', isAvailable: true},{name:'Incense', isAvailable: false},{name:'Cooking', isAvailable: false}]
  ),

  new Hall(
    4, 
    'AL REEM', 
    22000, 
    15, 
    [{id:7, uri:require('../assets/images/hall.jpg')}, {id:8, uri:require('../assets/images/hall2.jpg')}], 
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDDD', 
    [{name:'teaBoy', isAvailable: false},{name:'Incense', isAvailable: false},{name:'Cooking', isAvailable: true}]
  ),

  new Hall(
    5, 
    'AL NEEM', 
    15000, 
    22, 
    [{id:9, uri:require('../assets/images/hall.jpg')}, {id:10, uri:require('../assets/images/hall2.jpg')}], 
    'EEEEEEEEEEE', 
    [{name:'teaBoy', isAvailable: true},{name:'Incense', isAvailable: false},{name:'Cooking', isAvailable: true}]
  ),
  new Hall(
    6, 
    'AL SOOG', 
    21000, 
    27, 
    [{id:11, uri:require('../assets/images/hall.jpg')}, {id:12, uri:require('../assets/images/hall2.jpg')}], 
    'FFFFFFFFFFFFFFFFFFFFFFF', 
    [{name:'teaBoy', isAvailable: false},{name:'Incense', isAvailable: false},{name:'Cooking', isAvailable: true}]
  ),
];
