import React from 'react'

interface RowLabelProps {
  data?: {
    platform?: string
  }
}

export const RowLabel: React.FC<RowLabelProps> = ({ data }) => {
  return <span>{data?.platform || 'Social Link'}</span>
}

export default RowLabel