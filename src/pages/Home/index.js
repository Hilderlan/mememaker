import React from 'react';
import logo from '../../images/logo.svg';
import {Wrapper, Card, Templates, Form, Button} from './styles';

const Home = () => {
  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker"/>

      <Card>
        <h2>Selecione um template</h2>

        <Templates>
          <button type="button">
            <img src="" alt="Template"/>
          </button>
          <button type="button">
            <img src="" alt="Template"/>
          </button>
          <button type="button">
            <img src="" alt="Template"/>
          </button>
        </Templates>

        <h2>Textos</h2>

        <Form>
          <input type="text" placeholder="Texto 1" />
          <input type="text" placeholder="Texto 1" />
          <input type="text" placeholder="Texto 1" />

          <Button type="submit">MakeMyMeme</Button>
        </Form>
      </Card>
    </Wrapper>
  )
}

export default Home;