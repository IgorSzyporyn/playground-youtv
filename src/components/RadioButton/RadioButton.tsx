import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Svg = styled.svg`
  fill: var(--color-primary);
  display: inline-block;
  flex-shrink: 0;
  user-select: none;
`

type Props = {
  size: number
  checked?: boolean
} & React.SVGAttributes<SVGElement>

const RadioButton = ({ checked, height, width, size, ...props }: Props) => {
  return (
    <Svg aria-hidden="true" focusable="false" height={size} viewBox={`0 0 ${size} ${size}`} width={size} {...props}>
      {checked ? (
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      ) : (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      )}
    </Svg>
  )
}

export default RadioButton
