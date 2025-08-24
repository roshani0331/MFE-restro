import { getPayload } from 'payload'
import config from './src/payload.config'
import 'dotenv/config'

async function createFirstUser() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    
    // Check if any users exist
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })
    
    if (existingUsers.totalDocs > 0) {
      console.log('Users already exist in the database.')
      console.log('First user:', existingUsers.docs[0].email)
      return
    }
    
    console.log('Creating first admin user...')
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
      },
    })
    
    console.log('First user created successfully!')
    console.log('Email:', user.email)
    console.log('Name:', user.name)
    console.log('\nYou can now login to the admin panel at http://localhost:3000/admin')
    console.log('Email: admin@example.com')
    console.log('Password: password123')
    
  } catch (error) {
    console.error('Error creating first user:', error.message)
  } finally {
    process.exit(0)
  }
}

createFirstUser()