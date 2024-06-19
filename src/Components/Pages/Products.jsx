import axios from "axios";
import { memo, useEffect, useState } from "react"
import Product from "../Product";
// import '../../CSS/Products.css'
// import "../../CSS/productss.css"
import "../../CSS/Products1.css"
import ButtomComponent from "./ButtomComponent";
import '../../CSS/ProductDetails.css'
import { useNavigate } from "react-router-dom";
import AlertBox from "../AlertBox";



 function Products(){
    // console.log(design);
    let [products,setPtoducts] = useState([]);
    let [showModel,setShowModel] = useState(false)


    let navigatorView = useNavigate()
   let navigatorUpdate= useNavigate()

    

    let fetchProducts= async ()=>{
       

        try{
            
            let {data} = await axios.get("http://localhost:3000/products");
           
            setPtoducts(data)
        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        fetchProducts()
    },[])



    let view = (id)=>{
        navigatorView(`/productdetails/${id}`)
      }
  
      let update=(id)=>{
          navigatorUpdate(`/update/${id}`)
         
      }
  
      let  Delete= async (id)=>{
        try{
         await axios.delete(`http://localhost:3000/products/${id}`)
         setShowModel(true)
        }catch(err){
            console.log(err);
        }
        
        setTimeout(()=>{
            setShowModel(false)
        },800)
        setTimeout(() => {
            fetchProducts()
            
        }, 1100);       
      }


    return (
        <>
         <div className="alertAdd">
        {showModel && <AlertBox classname="delete-message" message={`The Product  is deleted successfully`} /> }
        </div>
        
    <div className="divProducts">
        <p className="message" style={{display:"none"}} >Deleted successfully</p>
        <div>
            <table cellSpacing="25px">
                <tbody>
        {products.map((a,index)=>{
            return (
                <tr align="center"key={index} className="product">
                <td>{index +1 }</td>
               <td> <img src= {`${a.imageurl[0]}`} alt="" /> </td>
                <td className="price">{a.pname} </td>
                <td>{a.price}</td>
                <td>{a.color}</td>
                <td>{a.qty}</td>
               
                <td  ><ButtomComponent className = "view" onclick={()=>{view(a.id)}} >View</ButtomComponent></td>
                <td ><ButtomComponent className = "update"  onclick={()=>{update(a.id)}} >Update</ButtomComponent></td>
                <td ><ButtomComponent className = "delete-message"  onclick={()=>{Delete(a.id)}} >Delete</ButtomComponent></td>
    
                </tr>
                // <Product {...a} key={a.id} index={index} fetchProducts={fetchProducts} />
            )
        })}
          </tbody>
        </table>
        </div>
    </div>  
    </>  
    )
}


export default memo(Products)