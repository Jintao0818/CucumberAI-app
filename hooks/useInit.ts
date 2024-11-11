import { useEffect, useState } from "react"
import { StatusAPI } from "@/api/func"

// 主页初始化：查询GPU服务器状态
function useInit() {
  
  const [status, setStatus] = useState(false)
  
  useEffect(() => {
    
    StatusAPI().then((res) => {
      setStatus(res.data.status)
    })
    // 定时器
    let intervalId: NodeJS.Timeout
    intervalId = setInterval(() => {
      StatusAPI().then((res) => {
        setStatus(res.data.status)
      })
    }, 5000)
    // 清理定时器
    return () => {
      clearInterval(intervalId)
    }
    
  }, [])

  return {status}
  
}

export default useInit
