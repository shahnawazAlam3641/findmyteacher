"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface ChatMessageProps {
  message: {
    id: string
    sender: string
    text: string
    timestamp: string
  }
  currentUser: "student" | "teacher"
  participants: {
    student: {
      id: string
      name: string
      image: string
    }
    teacher: {
      id: string
      name: string
      image: string
    }
  }
}

export default function ChatMessage({ 
  message, 
  currentUser,
  participants 
}: ChatMessageProps) {
  const [timeAgo, setTimeAgo] = useState("")
  
  const isOwnMessage = message.sender === currentUser
  const senderDetails = message.sender === "student" 
    ? participants.student 
    : participants.teacher
  
  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(message.timestamp), { addSuffix: true }))
    
    const timer = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(message.timestamp), { addSuffix: true }))
    }, 60000) // Update every minute
    
    return () => clearInterval(timer)
  }, [message.timestamp])
  
  return (
    <div 
      className={cn(
        "flex w-full mb-4",
        isOwnMessage && "justify-end"
      )}
    >
      {!isOwnMessage && (
        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3 mt-1">
          <Image 
            src={senderDetails.image}
            alt={senderDetails.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
      )}
      
      <div className={cn(
        "max-w-[75%]",
        isOwnMessage ? "bg-primary text-primary-foreground" : "bg-secondary",
        "rounded-2xl py-2 px-4 shadow-sm"
      )}>
        <div className="flex flex-col">
          {!isOwnMessage && (
            <span className="font-medium text-xs mb-1">
              {senderDetails.name}
            </span>
          )}
          <p className="text-sm">{message.text}</p>
          <span className="text-xs opacity-70 mt-1 text-right">
            {timeAgo}
          </span>
        </div>
      </div>
      
      {isOwnMessage && (
        <div className="relative h-8 w-8 rounded-full overflow-hidden ml-3 mt-1">
          <Image 
            src={senderDetails.image}
            alt={senderDetails.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
      )}
    </div>
  )
}