import { useState } from "react"
import design from "../../CSS/Home.module.css"
import {productType} from "./ProductsTypes"
import { faker } from '@faker-js/faker';
import InputComponent from "./InputComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtomComponent from "./ButtomComponent";
import AlertBox from "../AlertBox";

export default function Home(){
    let [product,setProduct] = useState({pname:"",price:"",color:"",desc:"",qty:"",category:""})
    let [showModel,setShowModel] = useState(false)
    let navigatorToProduct= useNavigate()
    
    function changeProduct({target:{name,value}}){

        setProduct({...product,[name]:value})
    }
    

    function randomImage5(){
            let arr=[]
            for(let i=1;i<=5;++i){
                arr.push(faker.image.avatar())
            }
            return arr
    }

    let transfer = async (e)=>{
        if(product.pname || product.price || product.color || product.desc || product.qty || product.category){
            return 

        }
        
        e.preventDefault();
        product.imageurl=randomImage5();
        try{

            await axios.post("http://localhost:3000/products",product)
            setShowModel(true)
        }catch(err){
            console.log(err);
        }
        setTimeout(()=>{
            setShowModel(false)
        },800)
        setTimeout(() => {
            navigatorToProduct('/products')
            
        }, 1000);
 }
   
    return (
        <> <div className={design.alertAdd}>{showModel && <AlertBox classname="added-message" message={`The Product '${product.pname}' is added successfully`} /> }</div>
        {/* <AlertBox message="Product is successfully added" diplay={display}  /> */}
        <form onSubmit={transfer} className={design.addProducts}>
            <p className={design.fill}>Add Product</p>
            { productType.map(a=>{
                return (
                    <InputComponent name={a.name} type={a.type} placeholder={a.placeholder} key={a.id} onchange ={changeProduct}/>
                )
                })
            }
            <ButtomComponent className="add-message" >Add Product</ButtomComponent>


        </form>
        </>
       

    )
}