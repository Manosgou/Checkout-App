import React from 'react';
import { SafeAreaView,  Text, View } from 'react-native';

//components
import Header from './components/Header';
import FloatActionButton from './components/FloatActionButton';


export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Header/>
      <FloatActionButton/>
    </SafeAreaView>
  );
}


