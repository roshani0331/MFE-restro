import React from 'react'

interface RowLabelProps {
  data?: {
    label?: string
  }
}

export const RowLabel: React.FC<RowLabelProps> = ({ data }) => {
  return <span>{data?.label || 'Nav Item'}</span>
}

export default RowLabel