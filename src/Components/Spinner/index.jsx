import { PacmanLoader } from 'react-spinners';

const style = {};
const CustomSpinner = ({ loading }) => {
  return (
    <PacmanLoader
      color='#08a500'
      loading
      size={15}
      cssOverride={{
        marginLeft: '45%',
        marginTop: '2%',
        visibility: `${loading ? 'visible' : 'hidden'}`,
      }}
    />
  );
};

export default CustomSpinner;
