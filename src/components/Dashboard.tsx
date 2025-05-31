import React from 'react'
import { Heart, Brain, Calendar, TrendingUp, Award, Target, Zap, Smile } from 'lucide-react'

interface DashboardProps {
  user: {
    name: string
    streak: number
    totalSessions: number
    currentMood: string
  }
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const stats = [
    { label: 'Current Streak', value: `${user.streak} days`, icon: Award, color: 'from-green-400 to-green-600' },
    { label: 'Total Sessions', value: user.totalSessions, icon: Brain, color: 'from-blue-400 to-blue-600' },
    { label: 'This Week', value: '5 sessions', icon: Calendar, color: 'from-purple-400 to-purple-600' },
    { label: 'Mood Score', value: '8.2/10', icon: Heart, color: 'from-pink-400 to-pink-600' },
  ]

  const quickActions = [
    { label: 'Quick Check-in', description: 'Log your current mood', icon: Heart, color: 'bg-red-500' },
    { label: 'Breathing Exercise', description: '5-minute guided session', icon: Zap, color: 'bg-blue-500' },
    { label: 'Daily Reflection', description: 'Journal your thoughts', icon: Calendar, color: 'bg-green-500' },
    { label: 'Chat with AI', description: 'Get personalized support', icon: Brain, color: 'bg-purple-500' },
  ]

  const recentActivities = [
    { type: 'mood', description: 'Logged feeling "good" with gratitude note', time: '2 hours ago', mood: 'good' },
    { type: 'exercise', description: 'Completed 10-minute meditation', time: '1 day ago', mood: 'calm' },
    { type: 'journal', description: 'Wrote about work stress management', time: '2 days ago', mood: 'reflective' },
    { type: 'chat', description: 'Had supportive conversation with AI', time: '3 days ago', mood: 'supported' },
  ]

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      'good': '😊',
      'calm': '😌',
      'reflective': '🤔',
      'supported': '🤗',
      'great': '😄',
      'okay': '😐',
      'sad': '😢'
    }
    return moodMap[mood] || '😊'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Good morning, {user.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          You're doing great! Let's continue your wellness journey today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{action.label}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{action.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="text-2xl">{getMoodEmoji(activity.mood)}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <Smile className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Daily Inspiration</h3>
            <p className="text-blue-100 italic">"The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives."</p>
            <p className="text-blue-200 text-sm mt-2">— William James</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
