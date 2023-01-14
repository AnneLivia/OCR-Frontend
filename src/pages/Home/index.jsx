import { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import CustomCard from '../../Components/Card';
import CustomSpinner from '../../Components/Spinner';

import axios from '../../service/api';
import logo from '../../assets/logo.png';
import { toast } from 'react-toastify';

const Home = () => {
  const [extractedText, setExtractedText] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.image.files[0]) {
      /*
        Provides a way to easily construct a set of key/value pairs representing form fields and their values, 
        which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form 
        would use if the encoding type were set to "multipart/form-data".
    */
      const formData = new FormData();

      formData.append('image', event.target.image.files[0]);

      setLoading(true);
      try {
        const response = await axios.post(
          '/?option=DOCUMENT_TEXT_DETECTION',
          formData
        );
        setExtractedText(response.data.result.text);
      } catch (err) {
        if (err.message === 'Network Error') {
          toast.error(
            'Erro de conexão com o servidor. Tente novamente mais tarde!'
          );
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className='w-50 position-absolute top-50 start-50 translate-middle'>
      <CustomCard
        hasFooter
        hasShadow
        title='Image Text Extractor'
        img={{
          src: logo,
          alt: 'Logo containing a image being processed by OCR',
        }}
        borderColor='#f2f2f2'
      >
        <CustomCard borderColor='#e5e5e5'>
          <Form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
            className='text-center'
          >
            <InputGroup className='mb-3'>
              <Form.Control
                size='sm'
                type='file'
                name='image'
                accept='.png, .jpg, .jpeg'
              />
              <Button variant='primary' size='sm' type='submit'>
                Extrair texto
              </Button>
            </InputGroup>
          </Form>
        </CustomCard>
        <CustomSpinner loading={loading} />
        {extractedText && (
          <p className='text-center h5 mt-4'>Texto extraído da imagem</p>
        )}
        {extractedText && (
          <CustomCard borderColor='#e5e5e5' className='mt-4' hasScroll>
            <p className='text-justify' style={{ whiteSpace: 'pre-wrap' }}>
              {extractedText}
            </p>
          </CustomCard>
        )}
      </CustomCard>
    </Container>
  );
};

export default Home;
