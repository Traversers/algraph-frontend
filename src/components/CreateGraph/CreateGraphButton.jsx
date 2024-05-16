import React from 'react';
import { Button, Flex } from 'antd';
import './CreateGraphButton.css';
import { Link } from 'react-router-dom';

const CreateGraphButton = () => {
 return(
    <Link to="../Create"> 
    <Flex gap="small" wrap>
    <Button className='createGraphButton'>Create Your Own Graph</Button>
  </Flex>
  </Link>
 );
}
export default CreateGraphButton;
