import React, {useEffect,useState} from 'react';
import './Components.css';
import ControlArrayTypes from '../genInter'

interface ControlProps{
    data:Object | null
    retrieveImgFunc:(array:ControlArrayTypes[]) => void
}

const ControlSection = (props:ControlProps) => {
    const [errFlag, setErrFlag] =  useState<boolean | null>(null)
    const [array, setArray] = useState<ControlArrayTypes[]>([
       {   
        title:"Breed", 
        list:new Array,
        value:null,
       },
       {   
        title:"Sub Breed", 
        list:null,
        value:null,
       }, 
       {   
        title:"Number of Images", 
        list:Array.from({length: 50}, (_, i) => i + 1), // Increase length to check lazy loading performance, Reduce length for testing speed
        value:null,
       }
    ])

    useEffect(()=>{
       if (props.data !== null) updateValue("Breed", props.data)
    },[props.data])

    useEffect(()=>{
       if(errFlag !== null) console.log("Error: Unselected mandatory field")
    },[errFlag])

    function updateValue (item:string, value:Object | string | null):void {
       if (value !== null && typeof value === "object" ) setArray(array.map((el) => el.title === item ? { ...el, list: Object.keys(value as Object)} : el))
       else {
           const condition: boolean = item === "Breed" && value !== null && (props.data as Object)[value as keyof Object].length > 0 
           const suBreVal: Function | null = condition ? (props.data as Object)[value as unknown as keyof Object] : null
           setArray(array.map((el) => el.title === "Sub Breed" && item === "Breed"  ? { ...el, value: null , list: suBreVal} : el.title === item ? { ...el, value: value} : el))
       }
    }

    function viewImgTrig ():void{
        if(array[0].value === null || array[2].value === null) {sessionStorage.setItem("errorState", "T"); setErrFlag(errFlag === null ? true : !errFlag)}
        else {sessionStorage.setItem("errorState", "F");  props.retrieveImgFunc(array)}
    }


     return(
        <div className="ctrlContainer">
            <form data-testid={"Form"} onClick={(e)=>{e.preventDefault()}}>
                { 
                  array.map((el,i)=>{
                    if (el.list != null) return(
                        <React.Fragment key={i}>
                        <div className="optWrapper">
                            <label >{el.title}</label>
                            <select data-testid={`select ${i}`}
                            value={el.value === null ? "Select" : el.value}
                            onChange={(e)=>{updateValue(el.title,e.currentTarget.value === "Select" ? null : e.currentTarget.value)}}
                            style={{border: sessionStorage.getItem("errorState") === "T" && (el.title !== "Sub Breed" && el.value === null) ? "1px solid red" : "1px solid #ccc" }}
                            >
                            <option  defaultChecked>Select</option>
                            { 
                            (el.list as string[]).map((subEl:string,n) => {
                                return(
                                    <React.Fragment key={n}>
                                    <option  >{subEl}</option>
                                    </React.Fragment>
                                )
                            }) 
                            }
                            </select>
                        </div>
                        </React.Fragment>
                    )
                }) 
                }
                <span className="triggerWrap">
                <input data-testid="Submit" onClick={()=>{viewImgTrig()}} type="submit" value="View Images"/>
                </span>
            </form>
        </div>
    
     )


}



export default ControlSection