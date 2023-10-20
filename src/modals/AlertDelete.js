import React, {useState} from 'react';
import { Alert } from 'reactstrap';
import Button from '../components/Button';


const AlertDelete = ({}) => {
  const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);
    
  return (
      <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          Are you sure that you want to proceed with removing task?
          <Button>Proceed</Button>
          <Button onClick={onDismiss}>Cancel</Button>
   </Alert>
  )
}

export default AlertDelete;



