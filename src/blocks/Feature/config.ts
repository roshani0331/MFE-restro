import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Feature: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Star', value: 'star' },
            { label: 'Shield', value: 'shield' },
            { label: 'Bolt', value: 'bolt' },
            { label: 'Chart', value: 'chart' },
            { label: 'Globe', value: 'globe' },
            { label: 'Clock', value: 'clock' },
            { label: 'Clipboard', value: 'clipboard' },
            { label: 'Package', value: 'package' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  labels: {
    singular: 'Feature Block',
    plural: 'Feature Blocks',
  },
}