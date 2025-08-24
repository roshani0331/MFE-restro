import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean
type isAuthenticatedAsync = (args: AccessArgs<User>) => Promise<boolean>

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

// Allow user creation when no users exist (for first user setup)
export const authenticatedOrFirstUser: isAuthenticatedAsync = async ({ req: { user, payload } }) => {
  if (user) return true
  
  // Check if any users exist in the database
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })
  
  // Allow creation if no users exist (first user scenario)
  return existingUsers.totalDocs === 0
}
