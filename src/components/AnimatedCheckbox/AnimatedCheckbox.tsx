import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion, HTMLMotionProps, useMotionValue, useTransform } from 'framer-motion'

const Root = styled(motion.div)<WrapperProps>`
  box-sizing: border-box;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

type WrapperProps = Omit<Props<string>, 'checked' | 'renderAs'>

const Wrapper = styled(motion.div)<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: inherit;
  width: 100%;
  height: 100%;
`

const CheckboxOuter = styled(Wrapper)<WrapperProps & { colorVar: string }>`
  position: relative;
  border-radius: 7%;
  border: 2px solid ${({ colorVar }) => colorVar};
`

const CheckboxInner = styled.svg``

const RadiobuttonInner = styled(motion.div)`
  width: 60%;
  height: 60%;
  border-radius: 100%;
`

const RadiobuttonOuter = styled(Wrapper)<WrapperProps & { colorVar: string }>`
  border-radius: 100%;
  border: 2px solid ${({ colorVar }) => colorVar};

  ${RadiobuttonInner} {
    background-color: ${({ colorVar }) => colorVar};
  }
`

export type CheckboxTypes = 'checkbox' | 'radiobutton'

export type VariantTypes = 'outlined' | 'filled'

type Props<T> = {
  checked: boolean
  renderAs?: CheckboxTypes
  size?: number
  type?: T
  variant?: VariantTypes
} & HTMLMotionProps<'div'>

const variants = {
  checkbox: {
    checked: { pathLength: 0.9 },
    unchecked: { pathLength: 0 },
  },
  radiobutton: {
    checked: { scale: 1, opacity: 1 },
    unchecked: { scale: 0, opacity: 0 },
  },
}

function AnimatedCheckbox<T extends string>({
  variant,
  checked,
  renderAs,
  size,
  type,
  ...rest
}: Props<T>) {
  const colorVar = `var(--color-${type})`
  const colorVarContrast = `var(--color-${type}-contrast)`

  const motionRef = useRef(null)
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])
  const animate = checked ? 'checked' : 'unchecked'

  return (
    <Root size={size} role="checkbox" aria-checked={checked} animate={animate} {...rest}>
      {renderAs === 'checkbox' ? (
        <CheckboxOuter colorVar={colorVar}>
          <CheckboxInner
            ref={motionRef}
            version="1.1"
            width={`${size}px`}
            height={`${size}px`}
            shapeRendering="geometricPrecision"
            viewBox={`0 0 150 150`}
          >
            <motion.path
              d="M38 74.707l24.647 24.646L116.5 45.5"
              fill="transparent"
              strokeWidth="20"
              stroke={colorVarContrast}
              strokeLinecap="round"
              variants={variants.checkbox}
              style={{ pathLength, opacity }}
              initial="unchecked"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </CheckboxInner>
        </CheckboxOuter>
      ) : (
        <RadiobuttonOuter colorVar={colorVar}>
          <RadiobuttonInner
            ref={motionRef}
            transition={{ type: 'spring' }}
            variants={variants.radiobutton}
            initial="unchecked"
          />
        </RadiobuttonOuter>
      )}
    </Root>
  )
}

AnimatedCheckbox.defaultProps = {
  size: 24,
  renderAs: 'checkbox',
  type: 'default',
  variant: 'outlined',
}

export default AnimatedCheckbox
