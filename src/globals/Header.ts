import type { GlobalConfig } from 'payload'
import { link } from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        link(),
      ],
      admin: {
        components: {
          RowLabel: '@/Header/RowLabel',
        },
      },
    },
  ],
}