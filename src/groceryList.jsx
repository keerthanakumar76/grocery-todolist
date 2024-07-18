/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function List() {
    const getItem = () =>{
        return JSON.parse(localStorage.getItem("groceries")) || [];
    }
    const[item, setItem] = useState("");
    const [list,setList] = useState(getItem());

    function addItem(){
        let newList=[...list, {
            name: item,
            checked: false,
            count: 1
        }];
        if (item === ""){
            toast.error("Please add an item!!",{
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        else{
            toast.success("Item has been added",{
                position: "top-center",
                autoClose: 3000,
            });
            setList(newList); 
        }
        setItem(""); 
        localStorage.setItem('groceries', JSON.stringify(newList));
    }
    const removeItem = (i) => {
        const newList = list.filter((_, index) => index !== i);
        toast.success("Item has been deleted!!",{
            position: "top-center",
            autoClose: 3000,
        });
        setList(newList);
        localStorage.setItem('groceries', JSON.stringify(newList));
    };
    const CheckboxChange= (i)=>{
        const newList = list.map((item, index) =>{
            if(index === i){
                return { ...item, checked: !item.checked };
            }
            return item;
        })
        setList(newList);
        localStorage.setItem('groceries', JSON.stringify(newList));
    }
        return(
        <div className="container">
            <h2>Grocery Bud</h2>
            <input 
                type="text" 
                placeholder="Grocery name"
                value={item}
                onChange = {(e) => setItem(e.target.value)}
            />
            <button className="addItem" onClick={addItem}>Add Item</button>
            <div className="groceryCart">
                {
                list.map((ele,i)=>{
                    return(
                        <div className="groceryCard" key={i}>
                            <div className="productName">
                            <input 
                                type="checkbox"
                                check = {ele.checked}
                                onChange = {(e) => CheckboxChange(i)}
                            />
                            <label 
                                htmlFor="grocery"
                                style = {{textDecoration: (ele.checked) ? 'line-through' : 'none'}}
                            >{ele.name}</label>
                            </div>
                            <button
                                title="remove item"
                                onClick={()=>removeItem(i)}
                            >
                                <svg width="25" height="24" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#808080" d="M600 0C268.63 0 0 268.63 0 600c0 331.369 268.63 600 600 600c331.369 0 600-268.63 600-600S931.369 0 600 0m0 130.371c259.369 0 469.556 210.325 469.556 469.629c0 259.305-210.187 469.556-469.556 469.556c-259.37 0-469.556-210.251-469.556-469.556C130.445 340.696 340.63 130.371 600 130.371M435.425 305.347L305.347 435.425L469.922 600L305.347 764.575l130.078 130.078L600 730.078l164.575 164.575l130.078-130.078L730.078 600l164.575-164.575l-130.078-130.078L600 469.922z"/>
                                </svg>
                            </button>
                      </div>
                    );
                })}
            </div>
            <ToastContainer />
        </div>
    );
}

export default List;