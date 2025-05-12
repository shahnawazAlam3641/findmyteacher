"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Send } from "lucide-react"
import { toast } from "sonner"
import ChatMessage from "@/components/chat/ChatMessage"

// Import chat data
import chatsData from "@/data/chats.json"
import teachersData from "@/data/teachers.json"

export default function ChatPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [chats, setChats] = useState<any[]>([])
  const [currentChat, setCurrentChat] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [filteredChats, setFilteredChats] = useState<any[]>([])
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    
    // Set user type based on localStorage
    const isTeacher = localStorage.getItem("isTeacher") === "true"
    setUserType(isTeacher ? "teacher" : "student")
    
    // Load chats
    setChats(chatsData)
    
    // Set first chat as current
    if (chatsData.length > 0) {
      setCurrentChat(chatsData[0])
    }
    
    setIsLoading(false)
  }, [router])
  
  // Filter chats based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChats(chats)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = chats.filter(chat => {
        const studentName = chat.participants.student.name.toLowerCase()
        const teacherName = chat.participants.teacher.name.toLowerCase()
        return studentName.includes(query) || teacherName.includes(query)
      })
      setFilteredChats(filtered)
    }
  }, [chats, searchQuery])
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentChat])
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    
    // Create new message
    const newMessageObj = {
      id: `m${currentChat.messages.length + 1}`,
      sender: userType,
      text: newMessage,
      timestamp: new Date().toISOString()
    }
    
    // Update current chat with new message
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessageObj]
    }
    
    // Update chats array with updated chat
    const updatedChats = chats.map(chat => 
      chat.id === currentChat.id ? updatedChat : chat
    )
    
    setCurrentChat(updatedChat)
    setChats(updatedChats)
    setNewMessage("")
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="flex h-[600px]">
            <div className="w-1/3 h-full bg-slate-200 dark:bg-slate-700 rounded mr-4" />
            <div className="w-2/3 h-full bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="flex flex-col md:flex-row h-[600px] gap-4 mb-10">
        {/* Chat List Sidebar */}
        <div className="md:w-1/3 h-[300px] md:h-full flex flex-col rounded-lg border overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1]
                const otherParticipant = userType === "student" 
                  ? chat.participants.teacher 
                  : chat.participants.student
                
                return (
                  <div
                    key={chat.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      currentChat?.id === chat.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setCurrentChat(chat)}
                  >
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={otherParticipant.image}
                          alt={otherParticipant.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{otherParticipant.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(lastMessage.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {lastMessage.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : searchQuery ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No conversations match your search</p>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No conversations yet</p>
                <Button asChild>
                  <a href="/teachers">Find Teachers</a>
                </Button>
              </div>
            )}
            
            {/* Add mock chat options if user is a student */}
            {userType === "student" && (
              <>
                {teachersData.slice(2, 5).map((teacher) => (
                  <div
                    key={teacher.id}
                    className="p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      // Create new empty chat if clicked
                      toast.info(`Start a conversation with ${teacher.name}`)
                    }}
                  >
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={teacher.profileImage}
                          alt={teacher.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{teacher.name}</h3>
                          <Badge variant="outline" className="text-xs">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {teacher.subject} • {teacher.city}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="md:w-2/3 h-full">
          {currentChat ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={userType === "student" 
                      ? currentChat.participants.teacher.image 
                      : currentChat.participants.student.image}
                    alt={userType === "student" 
                      ? currentChat.participants.teacher.name 
                      : currentChat.participants.student.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    {userType === "student" 
                      ? currentChat.participants.teacher.name 
                      : currentChat.participants.student.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {userType === "student" ? "Teacher" : "Student"}
                  </p>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentChat.messages.map((message: any) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    currentUser={userType}
                    participants={currentChat.participants}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    className="mr-2"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground mb-4">
                  Choose a conversation from the list or start a new one
                </p>
                <Button asChild>
                  <a href="/teachers">Find Teachers</a>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}