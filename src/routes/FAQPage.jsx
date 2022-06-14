import React, { useEffect, useState } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import { GiCardJoker, GiSpy, GiTakeMyMoney, GiTrophy } from 'react-icons/gi';
import { AiFillDislike } from 'react-icons/ai';
import styled from "styled-components"
import $ from 'jquery';
import { Button } from "../components/ui/buttons/button";
import { ClearAllData } from "../tools/DataUtils";
import { FaCode } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 100%;
  margin: 8px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20%;
`

const PageHeaderWrapper = styled.div`
  padding: 44px 0;
  display: flex;
  flex-direction: column;
`


const PageHeader = styled.div`
  font-size: max(5vw, 22px);
  text-align: center;
`

const PageSubheader = styled.div`
  font-size: max(2vw, 16px);
  text-align: center;
`

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px;
`

const SearchInput = styled.input`
  padding: var(--inline-spacing);
  border-radius: var(--border-radius);
  outline: none;
  background: var(--primary-900);
  border: 1px solid var(--primary-800);
  color: var(--primary-500);
  font-size: 18px;

  ::placeholder {
    color: var(--primary-700);
  }
`

const QuestionContainer = styled.div``

const QuestionWrapper = styled.div`
  padding: var(--content-padding);
  background: var(--surface-d);
  border-radius: var(--border-radius);
  margin-top: 16px;
`

const QuestionSegment = styled.div`

  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;

  & span {
    margin-left: 16px;
  }

`

const AnswerWrapper = styled.div`
  padding: 0 var(--content-padding);
`


const FAQData = [
  {
    id: 'who',
    q: <QuestionSegment>
      <BsPersonBoundingBox size={32} />
      <span>Who created this site?</span>
    </QuestionSegment>,
    a: <>
      <p>
        My name is Jesse, but I go by RazmaKaz online. I'm a Full Stack Developer. 
        I'm currently between work so I used some of my free time to make this site. 
      </p>
    </>,
  },{
    id: 'commission',
    q: <QuestionSegment>
      <GiTakeMyMoney size={32} />
      <span>Can I commission a site like this?</span>
    </QuestionSegment>,
    a: <>
      <p>
        Well, this site wasn't a commission. It was an act of passion. I made it because
        it seemed like a fun weekend project. However, I'm always open to hearing project pitches. 
        So, feel free to reach out to me on 
        Twitter: <a target="_blank" href="https://twitter.com/_razmakaz">@_razmakaz</a>
      </p><p>
        I don't like putting my email out on the internet because spam is a real problem and I didn't 
        want to write a server just to handle an email form, so... Twitter. 😁
      </p>
    </>
  },{
    id: 'how',
    q: <QuestionSegment>
      <FaCode size={32} />
      <span>How did you make this site?</span>
    </QuestionSegment>,
    a: <>
      <p>
        This site was made with Vite, React, Styled Components, and React Icons. I created all of the components
        myself (with the theme inspired from PrimeReact).
      </p><p>
        I've made the source code available publicly, so you can view 
        that <a target="_blank" href="https://github.com/razmakaz/arlo-bingo">on Github</a>. 
      </p>
    </>
  },{
    id: 'win',
    q: <QuestionSegment>
      <GiTrophy size={32} />
      <span>Do I get anything if I win?</span>
    </QuestionSegment>,
    a: <>
      <p>
        No. There's only about 6500 possible configurations of the Bingo cards. Arlo has... significantly
        more followers than that and I don't want him or I to commit to the chance that there's like, 100 
        winners and have to honor some reward for winning.
      </p>
    </>
  },{
    id: 'track',
    q: <QuestionSegment>
      <GiSpy size={32} />
      <span>What data do you track?</span>
    </QuestionSegment>,
    a: <>
      <p>
        I use Google Analytics to track very basic engagement statistics like the name you enter at the 
        beginning, Page Views, Page Loads, initializations, clicks on the bingo card, card resets,
        wins, etc. There are some things that Google tracks automatically that I have no control over, 
        like what area of the world you're generally in. So if you don't want that tracked, use 
        a <a target="_blank" href="https://duckduckgo.com/?q=vpn">VPN</a> or <a target="_blank" href="https://duckduckgo.com/?q=i2p">I2P</a>.
      </p>
    </>
  },{
    id: 'cheat',
    q: <QuestionSegment>
      <GiCardJoker size={32} />
      <span>What if I cheat?</span>
    </QuestionSegment>,
    a: <>
      <p>
        Have fun? Nobody's going to enforce the rules but you'll have to live with yourself knowing 
        that you cheated at a free community game. 😬
      </p>
    </>
  },{
    id: 'renew',
    q: <QuestionSegment>
      <AiFillDislike size={32} />
      <span>I don't like my card layout.</span>
    </QuestionSegment>,
    a: <>
      <p>
        I'm not a perfect developer, so sometimes people might have issues or problems with the cards that 
        they're assigned or you might just not like the layout.
      </p><p>
        Regardless of the case, you can use this button to reset the all of the data for the site and start over.
      </p>
      <Button color="red" onClick={ClearAllData}>Clear Bingo Data</Button>
    </>
  },{
    id: 'support',
    q: <QuestionSegment>
      <BiDonateHeart size={32} />
      <span>How can I support the developer?</span>
    </QuestionSegment>,
    a: <>
      <p>
        I accept donations through <a target="_blank" href="https://paypal.me/kazkade">PayPal</a> and
        through <a target="_blank" href="https://account.venmo.com/u/razmakaz">Venmo</a>. 
      </p><p>
        If you <b><i>do</i></b> donate, I'll be eternally grateful and love you forever. As a friend. Probably.
      </p>
    </>
  },
]

export const FAQPage = () => {

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search) {
      $('.question-container').hide().each((i, el) => {
        if (
          $(el).find('p').text().toLowerCase().includes(search.toLowerCase())) {
          $(el).show();
        }
      })
    } else {
      $('.question-container').show();
    }
  }, [search]);

  return (
    <Container>
      <Wrapper>
        <PageHeaderWrapper>
          <PageHeader>FAQ</PageHeader>
          <PageSubheader>Get Some Answers</PageSubheader>
        </PageHeaderWrapper>
        <SearchWrapper>
          <SearchInput 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search For Information"
          />
        </SearchWrapper>
        {FAQData.map((q, i) => (
          <QuestionContainer className={'question-container'} data-id={q.id}>
            <QuestionWrapper data-id={q.id} key={q.id+'-q'}>{q.q}</QuestionWrapper>
            <AnswerWrapper data-id={q.id} key={q.id+'-a'}>{q.a}</AnswerWrapper>
          </QuestionContainer>
        ))}
      </Wrapper>
    </Container>
  )
}