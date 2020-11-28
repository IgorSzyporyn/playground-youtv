import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion, HTMLMotionProps } from 'framer-motion'

type WrapperProps = Omit<Props<string>, 'checked' | 'renderAs'>

const Wrapper = styled(motion.div)<WrapperProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const Checkbox = styled(Wrapper)<WrapperProps & { colorVar: string }>``

const CheckboxIndicator = styled(motion.div)``

const Radiobutton = styled(Wrapper)<WrapperProps & { colorVar: string }>`
  border-radius: 100%;
  border: 2px solid ${({ colorVar }) => colorVar};
`

type RadiobuttonIndicatorProps = {
  colorVar: string
}

const RadiobuttonIndicator = styled(motion.div)<RadiobuttonIndicatorProps>`
  width: 60%;
  height: 60%;
  border-radius: 100%;
  background-color: ${({ colorVar }) => colorVar};
`

type CheckboxTypes = 'checkbox' | 'radiobutton'

type Props<T> = {
  checked: boolean
  renderAs?: CheckboxTypes
  size?: number
  type?: T
} & HTMLMotionProps<'div'>

const variants = {
  checkbox: {
    checked: {},
    unchecked: {},
  },
  radiobutton: {
    checked: { scale: 1, opacity: 1 },
    unchecked: { scale: 0, opacity: 0 },
  },
}

function AnimatedCheckbox<T extends string>({ checked, renderAs, size, type, ...rest }: Props<T>) {
  const motionRef = useRef(null)
  const animate = checked ? 'checked' : 'unchecked'
  const colorVar = `var(--color-${type})`

  return (
    <motion.div role="checkbox" aria-checked={checked} animate={animate} {...rest}>
      {renderAs === 'checkbox' ? (
        <Checkbox size={size} colorVar={colorVar}>
          <CheckboxIndicator ref={motionRef} />
        </Checkbox>
      ) : (
        <Radiobutton size={size} colorVar={colorVar}>
          <RadiobuttonIndicator
            colorVar={colorVar}
            ref={motionRef}
            transition={{ type: 'spring' }}
            variants={variants.radiobutton}
          />
        </Radiobutton>
      )}
    </motion.div>
  )
}

AnimatedCheckbox.defaultProps = {
  size: 24,
  renderAs: 'checkbox',
  type: 'default',
}

export default AnimatedCheckbox
