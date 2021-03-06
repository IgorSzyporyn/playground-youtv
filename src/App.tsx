import { motion, useCycle } from 'framer-motion'
import Mousetrap from 'mousetrap'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AnimatedCheckbox, { CheckboxTypes } from './components/AnimatedCheckbox/AnimatedCheckbox'

const Root = styled.div`
  height: 100%;
  min-height: 100%;
  color: var(--text-bright);
  padding: 32px 0;
`

const Header = styled.header``

const Title = styled.h1`
  font-size: 19px;
  font-weight: 500;
  margin: 0 0 24px;
  text-align: center;
`

const Text = styled.p`
  text-align: center;
  font-size: 14px;
  margin: 24px 0;
  padding: 0 16px;
  line-height: 1.6;
  font-weight: 300;
`

type BodyProps = {
  drawerOpen: boolean
}

const Body = styled.main<BodyProps>`
  padding-bottom: ${({ drawerOpen }) => (drawerOpen ? '136px' : 0)};
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

type ListItemProps = {
  selected: boolean
}

const ListItem = styled.li<ListItemProps & { current: boolean }>`
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  background-color: ${({ current }) => (current ? 'rgba(0, 0, 0, 0.2)' : 'transparent')};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const ListItemInner = styled.div<ListItemProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: space-between;
  padding: 0 16px;
  opacity: ${({ selected }) => (selected ? 1 : 0.7)};
`

const Drawer = styled(motion.footer)`
  background-color: var(--background-darker);
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 0;
  text-align: center;
`

const DrawerText = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.6;
  padding: 0 16px;

  &:last-child {
    margin-bottom: 32px;
  }
`

const DrawerTextHighLight = styled.span`
  font-weight: 700;
`

const Button = styled.button`
  outline: none;
  background-color: var(--color-primary);
  color: var(--text-bright);
  display: inline;
  border: 0 none;
  border-radius: 3px;
  padding: 0 16px;
  line-height: 36px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
`

type RegionType = {
  id: number
  text: string
}

const regions: RegionType[] = [
  { id: 1, text: 'TV2 Lorry' },
  { id: 2, text: 'TV2 Nordsjælland' },
  { id: 3, text: 'TV2 Fyn' },
  { id: 4, text: 'TV2 Bornholm' },
  { id: 5, text: 'TV2 Nordjylland' },
  { id: 6, text: 'TV2 Midtjylland' },
  { id: 7, text: 'TV2 Sønderjylland' },
  { id: 8, text: 'TV2 Anholt' },
  { id: 9, text: 'TV2 Samsø' },
  { id: 10, text: 'TV2 Sydfynske Øhav' },
  { id: 11, text: 'TV2 Halland' },
  { id: 12, text: 'TV2 Blekinge' },
  { id: 13, text: 'TV2 Skåne' },
  { id: 14, text: 'TV2 Slesvig-Holsten' },
  { id: 15, text: 'TV2 Royal' },
  { id: 16, text: 'TV2 Optimal City Slicker' },
]

type ContextTypes = 'primary' | 'secondary'

type IconSizeTypes = 16 | 24 | 32 | 48 | 64

type State = {
  dirty: boolean
  wasDirty: boolean
  currentId: number
  currentText: string
  selectedId: number
  selectedText: string
}

const defaultState: State = {
  dirty: false,
  wasDirty: false,
  currentId: regions[5].id,
  currentText: regions[5].text,
  selectedId: regions[5].id,
  selectedText: regions[5].text,
}

const getRegionTextById = (id: number) => {
  let text = ''

  regions.some((region) => {
    let found = false

    if (region.id === id) {
      text = region.text
      found = true
    }

    return found
  })

  return text
}

function App() {
  const [drawerOpen, toggleOpen] = useCycle(false, true)
  const [state, setState] = useState({ ...defaultState })
  const [renderAs, setRenderAs] = useState<CheckboxTypes>('radiobutton')
  const drawerRef = useRef(null)

  useEffect(() => {
    Mousetrap.bind('y o u t v', () => {
      const newRenderAs = renderAs === 'radiobutton' ? 'checkbox' : 'radiobutton'
      setRenderAs(newRenderAs)
    })

    return () => {
      Mousetrap.unbind('y o u t v')
    }
  }, [renderAs])

  useEffect(() => {
    if (!state.wasDirty && state.dirty) {
      toggleOpen()
    } else if (state.wasDirty && !state.dirty) {
      toggleOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <Root>
      <Header>
        <Title>Vælg TV2 Region</Title>
        <Text>
          Foretager du en ændring i valg af region skal du blot trykke på knappen "Bekræft ændring",
          og din ændring vil træde i kraft
        </Text>
      </Header>
      <Body drawerOpen={drawerOpen}>
        <List>
          {regions.map(({ id, text }) => {
            const selected = id === state.selectedId
            const current = id === state.currentId

            return (
              <ListItem
                selected={selected}
                current={current}
                key={`App-ListItem-${id}`}
                onClick={() => {
                  if (state.selectedId !== id) {
                    const dirty = state.currentId !== id
                    const wasDirty = state.currentId === id ? true : state.dirty
                    const selectedId = id
                    const selectedText = text

                    setState({ ...state, dirty, wasDirty, selectedId, selectedText })
                  }
                }}
              >
                <ListItemInner selected={selected}>
                  <span>{text}</span>
                  <AnimatedCheckbox<IconSizeTypes>
                    renderAs={renderAs}
                    size={24}
                    outerFill="var(--color-primary)"
                    checked={id === state.selectedId}
                  />
                </ListItemInner>
              </ListItem>
            )
          })}
        </List>
      </Body>
      <Drawer
        initial="closed"
        animate={drawerOpen ? 'open' : 'closed'}
        ref={drawerRef}
        transition={{ type: 'tween' }}
        variants={{
          open: { y: 0 },
          closed: { y: 200 },
        }}
      >
        <DrawerText>
          <span>Vil du skifte væk fra </span>
          <DrawerTextHighLight>{state.currentText}</DrawerTextHighLight>
          <span> som din aktive TV2 Region</span>
        </DrawerText>
        <Button
          onClick={() => {
            const selectedText = getRegionTextById(state.selectedId)

            setState({
              ...state,
              currentId: state.selectedId,
              currentText: selectedText,
              selectedText,
              wasDirty: false,
              dirty: false,
            })

            toggleOpen()
          }}
        >
          Bekræft ændring
        </Button>
      </Drawer>
    </Root>
  )
}

export default App
