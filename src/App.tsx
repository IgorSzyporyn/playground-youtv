import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, useCycle } from 'framer-motion'
import RadioButton from './components/RadioButton/RadioButton'

const Root = styled.div`
  height: 100%;
  min-height: 100%;
  color: var(--text-bright);
`

const Header = styled.header``

const Title = styled.h1`
  font-size: 19px;
  font-weight: 500;
  margin: 32px 0 24px;
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

const Body = styled.main``

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

type ListItemProps = {
  selected: boolean
}

const ListItem = styled.li<ListItemProps>`
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
`

const ListItemInner = styled.div<ListItemProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: space-between;
  padding: 0 16px;
  opacity: ${({ selected }) => (selected ? 1 : 0.65)};
  font-weight: ${({ selected }) => (selected ? 700 : 300)};
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

const DrawerText = styled(motion.p)`
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

const Button = styled.button`
  outline: none;
  background-color: var(--color-primary);
  color: var(--text-bright);
  display: inline;
  border: 0 none;
  border-radius: 3px;
  padding: 0 16px;
  line-height: 36px;
  font-weight: 500;
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
  { id: 11, text: 'TV2 Mallorca' },
]

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
  currentId: regions[0].id,
  currentText: regions[0].text,
  selectedId: regions[0].id,
  selectedText: regions[0].text,
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
  const [isOpen, toggleOpen] = useCycle(false, true)
  const [state, setState] = useState<State>({ ...defaultState })
  const drawerRef = useRef(null)

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
        <Title>TV2 Regioner</Title>
        <Text>
          Foretager du en ændring af valg af region skal du blot på knappen "Gem ændring" og din
          ændring vil træde i kraft
        </Text>
      </Header>
      <Body>
        <List>
          {regions.map(({ id, text }) => {
            const selected = id === state.selectedId
            return (
              <ListItem
                selected={selected}
                key={`ListItem-${id}`}
                onClick={() => {
                  if (state.selectedId !== id) {
                    setState({
                      ...state,
                      dirty: state.currentId !== id,
                      wasDirty: state.currentId === id ? true : state.dirty,
                      selectedId: id,
                      selectedText: text,
                    })
                  }
                }}
              >
                <ListItemInner selected={selected}>
                  <span>{text}</span>
                  <RadioButton size={24} checked={id === state.selectedId} />
                </ListItemInner>
              </ListItem>
            )
          })}
        </List>
      </Body>
      <Drawer
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={drawerRef}
        transition={{ type: 'tween' }}
        variants={{
          open: {
            y: 0,
          },
          closed: {
            y: 200,
          },
        }}
      >
        <DrawerText>
          Ændring vil skifte væk fra {state.currentText} som din aktive TV2 Region
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
          Gem ændring
        </Button>
      </Drawer>
    </Root>
  )
}

export default App
