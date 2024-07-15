"use client";
import { useEffect,useState } from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState(()=>{
        if(typeof window !== "undefined"){
            return window.innerWidth
        }
        return 0
    })
    const [height, setHeight] = useState(()=>{
        if(typeof window !== "undefined"){
            return window.innerHeight
        }
        return 0
    }
    )
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
    , [width, height])
    return { width, height }
}