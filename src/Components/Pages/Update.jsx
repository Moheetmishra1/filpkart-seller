import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import { productType } from "./ProductsTypes";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../CSS/Update.css"
import ButtomComponent from "./ButtomComponent";
import AlertBox from "../AlertBox";
// import "../../CSS/Update"


export default function Update(){

    let [product,setProduct] = useState({pname:"",price:"",category:"",color:"",desc:"",qty:""})
    let [showModel,setShowModel] = useState(false)

    let {pid} = useParams()
    let updatenav = useNavigate()

        
    function changeProduct({target:{name,value}}){

        setProduct({...product,[name]:value})
    }

    let updateFile = async()=>{
        try{
        await axios.put(`http://localhost:3000/products/${pid}`,product)
        setShowModel(true)

    }catch(err){
        console.log(err);
    }
    setTimeout(()=>{
        setShowModel(false)
    },600)
    setTimeout(() => {
        updatenav('/products')
        
    }, 1000);
  
            
    }


    let fetchData = async ()=>{
        
        try{
            let {data} = await axios.get(`http://localhost:3000/products/${pid}`)
            setProduct(data)
        }catch(err){
            console.log(err);
        }
    }


useEffect(()=>{
    fetchData()
},[])


    return (
        <>
        <div className="alertAdd">
        {showModel && <AlertBox classname="update-message" message={`The Product '${product.pname}' is Updated successfully`} /> }
        </div>
       
        <div className="updateBox">
            <p style={{textAlign:"center"}}>UPDATE</p>
            {productType.map((obj,index)=>{
                obj.value=product[obj.name]
                return (
                    <InputComponent key={index} {...obj} onchange={changeProduct} />
                )
            })}

            <ButtomComponent className="UpdateButtom" onclick={updateFile} >
                Update</ButtomComponent>
       
        </div>
        </>
    )
}