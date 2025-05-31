import React, { useState } from 'react'
import { Calendar, Plus, Search, Filter, BookOpen, Heart, Star } from 'lucide-react'

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  mood: number
  tags: string[]
  favorite: boolean
}

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Grateful for small moments',
      content: 'Today I realized how much joy can be found in simple things. The morning coffee tasted perfect, and I had a wonderful conversation with a colleague. Sometimes happiness is in the details we often overlook.',
      date: '2024-01-15',
      mood: 4,
      tags: ['gratitude', 'mindfulness'],
      favorite: true
    },
    {
      id: '2',
      title: 'Dealing with work stress',
      content: 'Had a challenging day at work with multiple deadlines. Feeling overwhelmed but trying to remember that this too shall pass. Used breathing exercises during lunch break which helped.',
      date: '2024-01-14',
      mood: 2,
      tags: ['stress', 'work', 'coping'],
      favorite: false
    },
    {
      id: '3',
      title: 'Weekend reflections',
      content: 'Spent the weekend hiking with friends. Nature has such a calming effect on me. I feel recharged and ready for the week ahead. Need to make more time for outdoor activities.',
      date: '2024-01-13',
      mood: 5,
      tags: ['nature', 'friends', 'exercise'],
      favorite: true
    }
  ])

  const [showNewEntry, setShowNewEntry] = useState(false)
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 3,
    tags: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        date: new Date().toISOString().split('T')[0],
        mood: newEntry.mood,
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        favorite: false
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: '', content: '', mood: 3, tags: '' })
      setShowNewEntry(false)
    }
  }

  const toggleFavorite = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, favorite: !entry.favorite } : entry
    ))
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'favorites' && entry.favorite) ||
                         (selectedFilter === 'recent' && new Date(entry.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesFilter
  })

  const getMoodEmoji = (mood: number) => {
    const moodMap: { [key: number]: string } = {
      1: '😢',
      2: '😞',
      3: '😐',
      4: '😊',
      5: '😄'
    }
    return moodMap[mood] || '😐'
  }

  const getMoodColor = (mood: number) => {
    const colorMap: { [key: number]: string } = {
      1: 'bg-red-500',
      2: 'bg-red-400',
      3: 'bg-yellow-400',
      4: 'bg-green-400',
      5: 'bg-green-500'
    }
    return colorMap[mood] || 'bg-gray-400'
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Personal Journal</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Reflect on your thoughts, feelings, and experiences. Writing can be a powerful tool for mental wellness.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Entries</option>
          <option value="recent">Recent (7 days)</option>
          <option value="favorites">Favorites</option>
        </select>

        <button
          onClick={() => setShowNewEntry(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* New Entry Form */}
      {showNewEntry && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">New Journal Entry</h2>
          <form onSubmit={handleSubmitEntry} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                placeholder="Give your entry a title..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How are you feeling? (1-5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className={`w-12 h-12 rounded-xl border-2 transition-all ${
                      newEntry.mood === mood
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl">{getMoodEmoji(mood)}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="Write about your thoughts, feelings, or experiences..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={newEntry.tags}
                onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                placeholder="gratitude, work, family, exercise..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowNewEntry(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No entries found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start writing your first journal entry!'}
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${getMoodColor(entry.mood)} flex items-center justify-center text-white text-xl`}>
                    {getMoodEmoji(entry.mood)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(entry.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    entry.favorite 
                      ? 'text-yellow-500 hover:text-yellow-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Star className={`w-5 h-5 ${entry.favorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{entry.content}</p>

              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Journal
