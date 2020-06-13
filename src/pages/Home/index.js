import React, {useState, useEffect} from 'react';
import logo from '../../images/logo.svg';
import {Wrapper, Card, Templates, Form, Button} from './styles';
import qs from 'qs';

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes');
      const {data: {memes}} = await resp.json();

      setTemplates(memes);
    })();
  }, []);

  const handleInputChange = (index) => (e) => {
    const newArray = boxes;
    newArray[index] = e.target.value;

    setBoxes(newArray);
  }

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: 'vikayel543',
      password: 'vikayel543',
      boxes: boxes.map(text => ({text}))
    });
    
    const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`);
    const {data: {url}} = await resp.json();

    setGeneratedMeme(url);
  }

  const handleReset = () => {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }

  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker"/>

      {generatedMeme
        ? (
          <>
            <img src={generatedMeme} alt="Generated Meme"/>
            <Button type="button" onClick={handleReset}>Generate another meme</Button>
          </>
        )
        : (
          <Card>
            <h2>Select a template</h2>

            <Templates>
              {templates.map(template => (
                <button key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className={selectedTemplate?.id === template.id ? 'selected' : ''}
                >
                  <img src={template.url} alt={template.name}/>
                </button>
              ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Textos</h2>

                <Form onSubmit={handleSubmit}>
                  {(new Array(selectedTemplate.box_count)).fill('').map((_, index) => (
                      <input key={index}
                      type="text"
                      placeholder={`Text ${index + 1}`}
                      onChange={handleInputChange(index)}
                      />
                  ))}
        
                  <Button type="submit">MakeMyMeme</Button>
                </Form>
              </>
            )}
          </Card>
        )
      }
    </Wrapper>
  )
}

export default Home;