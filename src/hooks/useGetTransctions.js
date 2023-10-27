import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import {db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo";
 
export const useGetTransactions = ()=>{
    const [transactions, setTransactions]= useState([]);
    const transactionCollectionRef = collection(db, "transactions");
    const {userId}= useGetUserInfo();
    let unsubscribe;

    const getTransactions = async ()=>{
        try{
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userId", "==", userId),
                orderBy("createdAt")
            )
            unsubscribe =onSnapshot(queryTransactions, (snapshot)=>{
                let docs = [];
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    const id = doc.id

                    docs.push(...data, id)
                })
                setTransactions(docs)
            })
        }catch(err){
            console.log(err)
        }
        return () => unsubscribe();

    };
    useEffect(()=>{
        getTransactions()
    }, [])
    return{transactions};
}