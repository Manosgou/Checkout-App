import React,{ Component } from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";

interface Props{
    title:string;
    total:number;

}

export default class Item extends Component<Props>{
    
    render(){
        const {title,total}=this.props;
        return(
            <TouchableOpacity style={styles.item}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemTotal}>{total}</Text>
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