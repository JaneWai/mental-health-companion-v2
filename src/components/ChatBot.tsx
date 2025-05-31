import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Heart, Lightbulb, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'suggestion' | 'exercise' | 'normal'
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental health companion. I'm here to listen, support, and help you navigate your wellness journey. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'normal'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickResponses = [
    "I'm feeling anxious",
    "I need motivation",
    "Help me relax",
    "I'm having trouble sleeping",
    "I feel overwhelmed",
    "I want to practice gratitude"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    
    let response = ""
    let type: 'suggestion' | 'exercise' | 'normal' = 'normal'

    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      response = "I understand you're feeling anxious. That's completely valid. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, then breathe out for 6. Would you like me to guide you through this?"
      type = 'exercise'
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      response = "I hear that you're going through a difficult time. Your feelings are valid, and it's okay to not be okay sometimes. Remember that this feeling is temporary. What's one small thing that usually brings you comfort?"
    } else if (lowerMessage.includes('motivation') || lowerMessage.includes('motivated')) {
      response = "I believe in your strength! Remember, every small step forward is progress. You've overcome challenges before, and you can do it again. What's one small goal you'd like to work towards today?"
      type = 'suggestion'
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      response = "Sleep troubles can be really challenging. Let's create a calming bedtime routine. Try putting away screens 1 hour before bed, practice some gentle stretches, or listen to calming music. Would you like some specific relaxation techniques?"
      type = 'exercise'
    } else if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('stress')) {
      response = "Feeling overwhelmed is a sign that you're taking on a lot. Let's break things down into smaller, manageable pieces. What's the most pressing thing on your mind right now? We can tackle it step by step."
      type = 'suggestion'
    } else if (lowerMessage.includes('gratitude') || lowerMessage.includes('grateful')) {
      response = "Gratitude is such a powerful practice! Let's try this: Can you think of three things, no matter how small, that you're grateful for today? They could be as simple as a warm cup of coffee or a text from a friend."
      type = 'exercise'
    } else if (lowerMessage.includes('relax') || lowerMessage.includes('calm')) {
      response = "Let's find some calm together. Try this progressive muscle relaxation: Start by tensing your shoulders for 5 seconds, then release. Notice the difference. Now do the same with your hands, then your face muscles. How does that feel?"
      type = 'exercise'
    } else {
      const responses = [
        "Thank you for sharing that with me. Your feelings are completely valid. Can you tell me more about what's going on?",
        "I'm here to listen and support you. What would be most helpful for you right now?",
        "It sounds like you're going through something important. How can I best support you today?",
        "I appreciate you opening up to me. What's been on your mind lately?",
        "Your wellbeing matters to me. Is there anything specific you'd like to talk about or work through?"
      ]
      response = responses[Math.floor(Math.random() * responses.length)]
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      type
    }
  }

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Companion</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your supportive AI companion is here to listen and help you through your wellness journey.
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-r from-green-400 to-blue-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : message.type === 'exercise'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-gray-900 dark:text-white'
                    : message.type === 'suggestion'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-gray-900 dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  {message.type === 'exercise' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Wellness Exercise</span>
                    </div>
                  )}
                  {message.type === 'suggestion' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Helpful Suggestion</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(response)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {response}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
