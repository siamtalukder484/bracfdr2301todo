import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set,onValue } from "firebase/database";


const App = () => {
  const db = getDatabase();
  let [task,setTask]=useState('')
  let [taskList,setTaskList]=useState([])


  let handleTask=(e)=>{
    setTask(e.target.value)
  }
  let handleSubmit=()=>{
    set(push(ref(db, 'todo/')), {
      name:task
    });
  }

  useEffect(()=>{
    const starCountRef = ref(db, 'todo/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        // console.log(item.val())
        arr.push(item.val())
      })
      setTaskList(arr)
    });
  },[])



  return (
    <div>
      <input onChange={handleTask} type="text" placeholder='Enter Your Task ' />
      <button onClick={handleSubmit}>submit</button>
      <div>
        {taskList.map((item)=>(
          <p>{item.name}</p>

        ))}
    
      </div>
    </div>
  )
}

export default App