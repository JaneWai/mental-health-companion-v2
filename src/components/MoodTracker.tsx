import React, { useState } from 'react'
import { Heart, Calendar, TrendingUp, Plus, Smile, Meh, Frown } from 'lucide-react'

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [showForm, setShowForm] = useState(false)

  const moods = [
    { value: 1, label: 'Very Sad', emoji: '😢', color: 'bg-red-500' },
    { value: 2, label: 'Sad', emoji: '😞', color: 'bg-red-400' },
    { value: 3, label: 'Okay', emoji: '😐', color: 'bg-yellow-400' },
    { value: 4, label: 'Good', emoji: '😊', color: 'bg-green-400' },
    { value: 5, label: 'Great', emoji: '😄', color: 'bg-green-500' },
  ]

  const moodHistory = [
    { date: '2024-01-15', mood: 4, note: 'Had a productive day at work', activities: ['work', 'exercise'] },
    { date: '2024-01-14', mood: 3, note: 'Feeling neutral, nothing special', activities: ['rest'] },
    { date: '2024-01-13', mood: 5, note: 'Amazing day with friends!', activities: ['social', 'outdoor'] },
    { date: '2024-01-12', mood: 2, note: 'Stressed about deadlines', activities: ['work'] },
    { date: '2024-01-11', mood: 4, note: 'Good meditation session', activities: ['meditation', 'reading'] },
    { date: '2024-01-10', mood: 3, note: 'Regular day, nothing special', activities: ['work', 'rest'] },
    { date: '2024-01-09', mood: 5, note: 'Completed a big project!', activities: ['work', 'celebration'] },
  ]

  const weeklyAverage = 3.6
  const monthlyTrend = '+0.3'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMood) {
      // Here you would typically save to a database
      console.log('Mood logged:', { mood: selectedMood, note })
      setSelectedMood(null)
      setNote('')
      setShowForm(false)
    }
  }

  const getMoodEmoji = (moodValue: number) => {
    const mood = moods.find(m => m.value === moodValue)
    return mood ? mood.emoji : '😐'
  }

  const getMoodColor = (moodValue: number) => {
    const mood = moods.find(m => m.value === moodValue)
    return mood ? mood.color : 'bg-gray-400'
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mood Tracker</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your daily emotions and discover patterns in your mental wellness journey.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{weeklyAverage}/5</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Weekly Average</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="text-green-500 text-sm font-medium">{monthlyTrend}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">7 days</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Current Streak</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Smile className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl">😊</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Good</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Most Common Mood</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Entry Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Log Today's Mood</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    How are you feeling today?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setSelectedMood(mood.value)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedMood === mood.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add a note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's on your mind today?"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedMood}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Log Mood
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mood History */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Entries</h2>
          <div className="space-y-4">
            {moodHistory.map((entry, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${getMoodColor(entry.mood)} flex items-center justify-center text-white text-xl`}>
                      {getMoodEmoji(entry.mood)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{entry.note}</p>
                      <div className="flex space-x-2 mt-2">
                        {entry.activities.map((activity, actIndex) => (
                          <span
                            key={actIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{entry.mood}/5</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoodTracker
