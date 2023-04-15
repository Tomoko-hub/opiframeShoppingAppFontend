import { useState, useEffect } from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface State{
    list:ShoppingItem[];
}

interface UrlRequest {
    request: Request;
    action: string;
}

const useAction = () =>{
    const [state, setState] = useState<State>({
        list:[]
    })

    const [UrlRequest, setUrlRequest] = useState<UrlRequest>({
        request:new Request("", {}),
        action:""
    })

    //FETCH useEffect
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(UrlRequest.request);
            if(!response){
                console.log("Server sent no response!");
                return;
            }
            if(response.ok){
                switch(UrlRequest.action){
                    case "getlist":
                        let temp = await response.json();
                        let list:ShoppingItem[]=temp as ShoppingItem[];
                        setState({
                            list:list
                        })
                        return;
                    case "additem":
                    case "removeitem":
                    case "edititem":
                        getList();
                        return;
                    default:
                        return;
                }
            } else {
                console.log("Server responsed with a status "+response.status+" "+response.statusText);
            }
        }
        fetchData();
    },[UrlRequest]);

    //HELPER FUNCTIONS
    const getList = ()=>{
        setUrlRequest({
            request:new Request("/api/shopping",{
                method:"GET"
            }),
            action:"getlist"
        })
    }

    const add = (item:ShoppingItem) => {
        setUrlRequest({
            request:new Request("/api/shopping",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(item)
            }),
            action:"additem"
        })
    }

    const remove = (id:number) =>{
        setUrlRequest({
            request:new Request("/api/shopping/"+id,{
                method:"DELETE"
            }),
            action:"removeitem"
        })
    }

    const edit = (item:ShoppingItem) =>{
        setUrlRequest({
            request:new Request("/api/shopping/"+item.id,{
                method:"PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(item)
            }),
            action:"edititem"
        })
    }
    return {state,getList,add,remove,edit};
}

export default useAction;