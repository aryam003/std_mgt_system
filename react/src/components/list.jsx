import { useEffect,useState } from "react"
import axios from 'axios'


function List(){
    const [data,setData]=useState([])
    const [Editing,setEditing]=useState(false)
    const [Editdata,setEditData]=useState(null)

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/todo/").then((res)=>{
            console.log(res.data);
            setData(res.data)
        }).catch(error=>console.log(error.message))
    },[])
    const Edit_dtls=(task)=>{
        setEditing(true)
        setEditData(task)
    }

    const updateDtls=(id,task)=>{
        setEditing(false)
        axios.put(`http://127.0.0.1:8000/api/todo/${id}/`,task).then(res=>{
            setData(data.map((prv)=>prv.id===id ? res.data : prv))
        }).catch(error=>console.log(error.message))
    }

    const Delete_dtls=(id)=>{
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`).then(res=>{
            setData(data.filter((task)=>task.id!=id))
        }).catch(error=>console.log(error.message))
    }

    return(
        <div className="container">
            <h1>Student Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Roll_no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>P_no</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value,index)=>(
                        <tr key={index}>
                            <td>{value.roll_no}</td>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{value.ph_no}</td>
                            <td><button className="btn btn-outline-info" onClick={()=>{Edit_dtls(value)}}>Edit</button></td>
                            <td><button className="btn btn-outline-danger" onClick={()=>{Delete_dtls(value.id)}}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {Editing ? <EditForm curTask={Editdata} updatefun={updateDtls}/>:null}
        </div>
    )
}
const EditForm=({curTask,updatefun})=>{
    const[task,setTask]=useState(curTask)
    
    const handleChange=(e)=>{
        const{name,value}=e.target
        setTask({...task,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        updatefun(task.id,task)
    }
    return(
        <form  onSubmit={handleSubmit}>
            <input type="text" name="roll_no" id="roll_no" value={task.roll_no} onChange={handleChange} />
            <input type="text" name="name" id="name" value={task.name} onChange={handleChange} />
            <input type="text" name="email" id="email" value={task.email} onChange={handleChange} />
            <input type="text" name="ph_no" id="ph_no" value={task.ph_no} onChange={handleChange} />
            <input type="submit" value="Update" />
        </form>
    )
}

export default List 