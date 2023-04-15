import React from "react";
import ShoppingItem from "../models/ShoppingItem";
import Row from "./Row";

interface Props {
    list:ShoppingItem[];
    remove(id:number):void;
    edit(item:ShoppingItem):void;
}

const ShoppingList:React.FC<Props>=(props:Props)=>{
    const ShoppingItems=props.list.map((item)=>{
        return(
            <Row key={item.id} item={item} /> //TODO add Row
        )
    })

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Remove</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {ShoppingItems}
            </tbody>
        </table>
    )
}

export default ShoppingList