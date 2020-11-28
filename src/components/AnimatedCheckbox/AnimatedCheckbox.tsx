import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion, HTMLMotionProps, useMotionValue, useTransform } from 'framer-motion'

type RootProps = Omit<Props<string, number>, 'checked' | 'renderAs'>

const Root = styled(motion.div)<RootProps>`
  box-sizing: border-box;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: inherit;
  width: 100%;
  height: 100%;
`

type OuterProps = {
  color: string
}

const CheckboxOuter = styled(Wrapper)<OuterProps>`
  position: relative;
  border-radius: 7%;
  border: 2px solid ${({ color }) => color};
`

const CheckboxInner = styled.svg``

const RadiobuttonInner = styled(motion.div)`
  width: 60%;
  height: 60%;
  border-radius: 100%;
`

const RadiobuttonOuter = styled(Wrapper)<OuterProps>`
  border-radius: 100%;
  border: 2px solid ${({ color }) => color};

  ${RadiobuttonInner} {
    background-color: ${({ color }) => color};
  }
`

export type CheckboxTypes = 'checkbox' | 'radiobutton'

export type VariantTypes = 'outlined' | 'filled'

type Props<T, U> = {
  checked: boolean
  renderAs?: CheckboxTypes
  size?: U
  type?: T
  variant?: VariantTypes
} & HTMLMotionProps<'div'>

function AnimatedCheckbox<T extends string, U extends number>({
  variant,
  checked,
  renderAs,
  size,
  type,
  ...rest
}: Props<T, U>) {
  const color = `var(--color-${type})`
  const contrastColor = `var(--color-${type}-contrast)`

  const motionRef = useRef(null)
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])
  const animate = checked ? 'checked' : 'unchecked'

  return (
    <Root animate={animate} aria-checked={checked} role="checkbox" size={size} {...rest}>
      {renderAs === 'radiobutton' ? (
        <RadiobuttonOuter color={color}>
          <RadiobuttonInner
            initial="unchecked"
            ref={motionRef}
            transition={{ type: 'spring' }}
            variants={{
              checked: { scale: 1, opacity: 1 },
              unchecked: { scale: 0, opacity: 0 },
            }}
          />
        </RadiobuttonOuter>
      ) : (
        <CheckboxOuter color={color}>
          <CheckboxInner
            height={`${size}px`}
            ref={motionRef}
            shapeRendering="geometricPrecision"
            version="1.1"
            viewBox={`0 0 150 150`}
            width={`${size}px`}
          >
            <motion.path
              d="M38 74.707l24.647 24.646L116.5 45.5"
              initial="unchecked"
              fill="transparent"
              stroke={contrastColor}
              strokeLinecap="round"
              strokeWidth="20"
              style={{ pathLength, opacity }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              variants={{
                checked: { pathLength: 0.9 },
                unchecked: { pathLength: 0 },
              }}
            />
          </CheckboxInner>
        </CheckboxOuter>
      )}
    </Root>
  )
}

AnimatedCheckbox.defaultProps = {
  renderAs: 'checkbox',
  size: 24,
  type: 'default',
  variant: 'outlined',
}

export default AnimatedCheckbox
