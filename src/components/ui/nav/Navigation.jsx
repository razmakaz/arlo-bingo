import styled from "styled-components"
import Arlo from '../../../media/images/arlo.svg';
import { MdGridOn } from 'react-icons/md';
import { FaQuestion, FaRegHandPointRight } from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';
import { useContext } from "react";
import { AppState } from "../../../App";

const Container = styled.div`
  background: var(--surface-b);
  height: 100%;
`

const Wrapper = styled.div`
  position: relative;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ArloHeader = styled.img`
  flex: 1;
  width: 64px;
  margin: 8px;
  align-self: center;
`

const ArloText = styled.div`
  font-size: 18px;
  align-self: center;
`

const Divider = styled.hr`
  width: 100%;
  background: var(--surface-d);
  border: none;
  height: 1px;
`

const NavItem = styled.div`
  position: relative;
  padding: 8px;
  display: flex;

  border-radius: 3px 22px 22px 3px;
  margin-bottom: 8px;
  border: 1px solid ${p => p.active ? 'var(--primary-500) !important' : 'var(--primary-800)'};
  background: ${p => p.active ? 'var(--primary-800) !important' : 'var(--surface-a)'};
  cursor: pointer;
  transition: all 222ms;
  transform: translateX(${p => p.active ? '0px' : '0px'});
  margin-right: ${p => p.active ? '-40px' : '-0px'};
  overflow: hidden;

  &:hover {
    background: var(--surface-card);
    background: var(--primary-800);
  }
`

const NavItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Navigation = () => {

  const [state, setState] = useContext(AppState);

  return (
    <Container>
      <Wrapper>
        <ArloHeader src={Arlo} />
        <ArloText>Arlo's Bingo</ArloText>
        <Divider />
        <NavItem onClick={() => setState({...state, page: 'bingo'})} active={state.page === 'bingo'}>
          <NavItemWrapper>
            <span>Bingo</span>
            <MdGridOn size={18} />
          </NavItemWrapper>
        </NavItem>

        {/* <NavItem onClick={() => setState({...state, page: 'donate'})} active={state.page === 'donate'}>
          <NavItemWrapper>
            <span>Donate</span>
            <BiDonateHeart size={18} />
          </NavItemWrapper>
        </NavItem> */}

        <NavItem onClick={() => setState({...state, page: 'faq'})} active={state.page === 'faq'}>
          <NavItemWrapper>
            <span>FAQ</span>
            <FaQuestion size={18} />
          </NavItemWrapper>
        </NavItem>

      </Wrapper>
    </Container>
  )
}