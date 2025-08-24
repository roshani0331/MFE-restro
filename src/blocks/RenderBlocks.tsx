import React, { Fragment, memo, useMemo } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBlock } from '@/blocks/Hero/Component'
import { FeatureBlock } from '@/blocks/Feature/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  hero: HeroBlock,
  feature: FeatureBlock,
  testimonial: TestimonialBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = memo((props) => {
  const { blocks } = props

  const hasBlocks = useMemo(() => 
    blocks && Array.isArray(blocks) && blocks.length > 0,
    [blocks]
  )

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
})
