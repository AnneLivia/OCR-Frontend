import { Card } from 'react-bootstrap';
import './index.css';

const CustomCard = ({
  className,
  title,
  img,
  children,
  hasFooter,
  hasShadow,
  borderColor,
  hasScroll,
}) => {
  return (
    <Card
      className={`${className} ${hasShadow ? 'shadow' : ''}`}
      style={{ borderColor }}
    >
      {img && (
        <img
          src={img.src}
          alt={img.alt}
          className='mt-4 mb-2 mx-auto d-block'
          width={80}
          height={80}
        />
      )}
      <Card.Body className={`${hasScroll ? 'scroll' : ''}`}>
        {title && (
          <Card.Title className='mb-4 text-center text-uppercase'>
            {title}
          </Card.Title>
        )}
        {children}
      </Card.Body>
      {hasFooter && (
        <Card.Footer
          style={{ borderColor: '#FFF' }}
          className='text-center mb-1'
        >
          Developed by Anne Livia
        </Card.Footer>
      )}
    </Card>
  );
};

export default CustomCard;
