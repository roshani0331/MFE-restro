import { getPayload } from 'payload';
import config from './src/payload.config.ts';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function updateNavigation() {
  try {
    console.log('Updating navigation...');
    
    const payload = await getPayload({ config });
    
    // Get current header data
    const currentHeader = await payload.findGlobal({
      slug: 'header',
    });
    
    console.log('Current header:', JSON.stringify(currentHeader, null, 2));
    
    // Update header with Posts link
    const updatedHeader = await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: {
                en: 'Posts',
                es: 'Publicaciones',
              },
              url: '/posts',
            },
          },
          {
            link: {
              type: 'custom',
              label: {
                en: 'Contact',
                es: 'Contacto',
              },
              url: '/contact',
            },
          },
        ],
      },
    });
    
    console.log('Updated header:', JSON.stringify(updatedHeader, null, 2));
    console.log('Navigation updated successfully!');
    
  } catch (error) {
    console.error('Error updating navigation:', error);
  }
  
  process.exit(0);
}

updateNavigation();