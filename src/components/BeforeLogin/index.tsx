'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const BeforeLogin: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })

      if (response.ok) {
        setMessage('Account created successfully! You can now log in.')
        setShowSignup(false)
        setSignupData({ email: '', password: '', name: '' })
      } else {
        const error = await response.json()
        setMessage(error.message || 'Failed to create account')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (showSignup) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Create Admin Account</h2>
          <p className="text-sm text-gray-600 mb-4">
            Create a new admin account to manage your website.
          </p>
        </div>
        
        {message && (
          <div className={`p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <Label htmlFor="signup-name">Name</Label>
            <Input
              id="signup-name"
              type="text"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setShowSignup(false)
                setMessage('')
                setSignupData({ email: '', password: '', name: '' })
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <p>
          <b>Welcome to your dashboard!</b>
          {' This is where site admins will log in to manage your website.'}
        </p>
      </div>
      
      {message && (
        <div className={`p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Don&apos;t have an admin account?
        </p>
        <Button 
          onClick={() => setShowSignup(true)}
          variant="outline"
          size="sm"
        >
          Create Admin Account
        </Button>
      </div>
    </div>
  )
}

export default BeforeLogin
