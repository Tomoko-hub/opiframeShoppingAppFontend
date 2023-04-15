import React from "react";
import ShoppingItem from "../models/ShoppingItem";

interface Props {
    item: ShoppingItem;
}

const Row:React.FC<Props> = (props:Props)=>{
    return(
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.count}</td>
            <td>{props.item.price}</td>
            <td><button className="btn btn-danger">Remove</button></td>
            <td><button className="btn btn-secondary">Edit</button></td>
        </tr>
    )
}

export default Row;