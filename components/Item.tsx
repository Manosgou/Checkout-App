import React,{ Component } from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";

interface Props{
    id:string;
    title:string;
    showModal():void
}

export default class Item extends Component<Props>{
    
    render(){
        const {title,showModal}=this.props;
        return(
            <TouchableOpacity style={styles.item} onPress={showModal}>
                <Text style={styles.itemTitle}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#036704',
        borderRadius: 20,
        padding: 15,
        margin: 15,
        elevation: 5,
    },
    itemTitle:{
        textAlign:'center',
        fontSize:25
    },
    itemTotal:{
        fontSize:18
    }


})