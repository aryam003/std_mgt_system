import { useState } from "react"
import axios from 'axios'

function Add(){
    const [roll_no,setRoll_no]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [ph_no,setPh_no]=useState('')


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/api/todo/",{roll_no,name,email,ph_no}).then((res)=>{
            setRoll_no('')
            setName('')
            setEmail('')
            setPh_no('')
        }).catch(error=>console.log(error.message))
    }


    return(
        <form  onSubmit={handleSubmit}>
            <input type="text" name="roll_no" placeholder="Roll_no" id="roll_no" value={roll_no} onChange={(e)=>setRoll_no(e.target.value)} />
            <input type="text" name="name" placeholder="Name" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" name="email" placeholder="Email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" name="ph_no" placeholder="Ph_no" id="ph_no" value={ph_no} onChange={(e)=>setPh_no(e.target.value)} />
            <input type="submit" value="Add" />
        </form>
    )
    
}
export default Add