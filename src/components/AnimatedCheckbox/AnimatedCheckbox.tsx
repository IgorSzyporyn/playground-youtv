import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion, HTMLMotionProps, useMotionValue, useTransform } from 'framer-motion'

type RootProps = Omit<Props<number>, 'checked'>

const Root = styled(motion.div)<RootProps>`
  box-sizing: border-box;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

const Wrapper = styled(motion.div)`
  align-items: center;
  box-sizing: inherit;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`

type CheckboxOuterProps = {
  outerColor: string
}

const CheckboxOuter = styled(Wrapper)<CheckboxOuterProps>`
  border-radius: 7%;
  border: 2px solid ${({ outerColor }) => outerColor};
  position: relative;
`

type RadiobuttonOuterProps = {
  innerColor: string
  outerColor: string
}

const RadiobuttonInner = styled(motion.div)`
  border-radius: 100%;
  height: 60%;
  width: 60%;
`

const RadiobuttonOuter = styled(Wrapper)<RadiobuttonOuterProps>`
  border-radius: 100%;
  border: 2px solid ${({ outerColor }) => outerColor};

  ${RadiobuttonInner} {
    background-color: ${({ innerColor }) => innerColor};
  }
`

export type CheckboxTypes = 'checkbox' | 'radiobutton'

export type VariantTypes = 'outlined' | 'filled'

type Props<U> = {
  checked: boolean
  innerFill?: string
  outerFill?: string
  renderAs?: CheckboxTypes
  size?: U
  variant?: VariantTypes
} & HTMLMotionProps<'div'>

function AnimatedCheckbox<U extends number>({
  checked,
  innerFill,
  outerFill,
  renderAs,
  size,
  variant,
  ...rest
}: Props<U>) {
  const outerColor = outerFill || AnimatedCheckbox.defaultProps.outerFill
  const innerColor = innerFill || outerColor

  const animate = checked ? 'checked' : 'unchecked'
  const motionRef = useRef(null)
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
    <Root animate={animate} aria-checked={checked} role="checkbox" size={size} {...rest}>
      {renderAs === 'radiobutton' ? (
        <RadiobuttonOuter innerColor={innerColor} outerColor={outerColor}>
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
        <CheckboxOuter outerColor={outerColor}>
          <svg
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
              stroke={innerColor}
              strokeLinecap="round"
              strokeWidth="20"
              style={{ pathLength, opacity }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              variants={{
                checked: { pathLength: 0.9 },
                unchecked: { pathLength: 0 },
              }}
            />
          </svg>
        </CheckboxOuter>
      )}
    </Root>
  )
}

AnimatedCheckbox.defaultProps = {
  outerFill: 'currentColor',
  renderAs: 'checkbox',
  size: 24,
  variant: 'outlined',
}

export default AnimatedCheckbox
