import React from 'react'
import { TrendingUp, Calendar, Heart, Brain, Target, Award } from 'lucide-react'

const Analytics: React.FC = () => {
  const moodData = [
    { date: '2024-01-09', mood: 5 },
    { date: '2024-01-10', mood: 3 },
    { date: '2024-01-11', mood: 4 },
    { date: '2024-01-12', mood: 2 },
    { date: '2024-01-13', mood: 5 },
    { date: '2024-01-14', mood: 3 },
    { date: '2024-01-15', mood: 4 },
  ]

  const insights = [
    {
      title: "Mood Patterns",
      description: "Your mood tends to be higher on weekends and after exercise sessions.",
      icon: Heart,
      color: "from-pink-400 to-pink-600"
    },
    {
      title: "Sleep Impact",
      description: "You report better moods on days following 7+ hours of sleep.",
      icon: Brain,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Activity Correlation",
      description: "Meditation and outdoor activities show the strongest positive correlation with your mood.",
      icon: Target,
      color: "from-green-400 to-green-600"
    },
    {
      title: "Progress Trend",
      description: "Your overall mood trend has improved by 15% over the past month.",
      icon: TrendingUp,
      color: "from-purple-400 to-purple-600"
    }
  ]

  const weeklyStats = [
    { label: 'Average Mood', value: '3.7/5', change: '+0.3', positive: true },
    { label: 'Check-ins', value: '7/7', change: '100%', positive: true },
    { label: 'Meditation Minutes', value: '105', change: '+15', positive: true },
    { label: 'Journal Entries', value: '5', change: '+2', positive: true },
  ]

  const moodDistribution = [
    { mood: 'Great', count: 8, percentage: 35, color: 'bg-green-500' },
    { mood: 'Good', count: 7, percentage: 30, color: 'bg-green-400' },
    { mood: 'Okay', count: 5, percentage: 22, color: 'bg-yellow-400' },
    { mood: 'Sad', count: 2, percentage: 9, color: 'bg-red-400' },
    { mood: 'Very Sad', count: 1, percentage: 4, color: 'bg-red-500' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics & Insights</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover patterns in your mental wellness journey and track your progress over time.
        </p>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {weeklyStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</h3>
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">7-Day Mood Trend</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {moodData.map((data, index) => {
                const height = (data.mood / 5) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative overflow-hidden">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-500 flex items-end justify-center"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      >
                        <span className="text-white text-xs font-medium mb-1">{data.mood}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Insights */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">AI-Generated Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => {
                const Icon = insight.icon
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mood Distribution */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mood Distribution</h2>
            <div className="space-y-4">
              {moodDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-gray-900 dark:text-white font-medium">{item.mood}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{item.count}</span>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Goals Progress</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 dark:text-white font-medium">Daily Check-ins</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">7/7</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 dark:text-white font-medium">Meditation Goal</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">105/150 min</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 dark:text-white font-medium">Journal Entries</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">5/5</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
