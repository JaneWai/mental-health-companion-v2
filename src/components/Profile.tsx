import React, { useState } from 'react'
import { User, Settings, Bell, Shield, Palette, Target, Award, Calendar } from 'lucide-react'

interface ProfileProps {
  user: {
    name: string
    streak: number
    totalSessions: number
    currentMood: string
  }
  setUser: (user: any) => void
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: 'alex@example.com',
    bio: 'On a journey to better mental health and mindfulness.',
    goals: ['Daily meditation', 'Mood tracking', 'Regular exercise', 'Better sleep'],
    notifications: {
      dailyReminder: true,
      weeklyReport: true,
      moodCheckIn: true,
      achievements: true
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      publicProfile: false
    }
  })

  const achievements = [
    { title: '7-Day Streak', description: 'Logged mood for 7 consecutive days', earned: true, date: '2024-01-15' },
    { title: 'First Journal Entry', description: 'Wrote your first journal entry', earned: true, date: '2024-01-10' },
    { title: 'Meditation Master', description: 'Completed 10 meditation sessions', earned: true, date: '2024-01-12' },
    { title: '30-Day Warrior', description: 'Maintain streak for 30 days', earned: false, date: null },
    { title: 'Mood Explorer', description: 'Log 50 different mood entries', earned: false, date: null },
    { title: 'Wellness Champion', description: 'Complete all daily goals for a week', earned: false, date: null },
  ]

  const stats = [
    { label: 'Days Active', value: '23', icon: Calendar },
    { label: 'Current Streak', value: `${user.streak}`, icon: Award },
    { label: 'Total Sessions', value: `${user.totalSessions}`, icon: Target },
    { label: 'Achievements', value: '3/6', icon: Award },
  ]

  const handleSaveProfile = () => {
    setUser({ ...user, name: profileData.name })
    // Here you would typically save to a database
    console.log('Profile saved:', profileData)
  }

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profileData.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-8">
      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notifications</h2>
        <div className="space-y-4">
          {Object.entries(profileData.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {key === 'dailyReminder' && 'Get reminded to check in daily'}
                  {key === 'weeklyReport' && 'Receive weekly progress reports'}
                  {key === 'moodCheckIn' && 'Reminders to log your mood'}
                  {key === 'achievements' && 'Notifications for new achievements'}
                </p>
              </div>
              <button
                onClick={() => setProfileData({
                  ...profileData,
                  notifications: { ...profileData.notifications, [key]: !value }
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
        <div className="space-y-4">
          {Object.entries(profileData.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {key === 'dataSharing' && 'Share anonymized data for research'}
                  {key === 'analytics' && 'Allow usage analytics for app improvement'}
                  {key === 'publicProfile' && 'Make your profile visible to others'}
                </p>
              </div>
              <button
                onClick={() => setProfileData({
                  ...profileData,
                  privacy: { ...profileData.privacy, [key]: !value }
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAchievementsTab = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className={`p-6 rounded-2xl border-2 transition-all ${
            achievement.earned 
              ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                achievement.earned 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 ${
                  achievement.earned 
                    ? 'text-green-900 dark:text-green-100' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-2 ${
                  achievement.earned 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && achievement.date && (
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile & Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account, preferences, and track your wellness achievements.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'settings' && renderSettingsTab()}
      {activeTab === 'achievements' && renderAchievementsTab()}
    </div>
  )
}

export default Profile
