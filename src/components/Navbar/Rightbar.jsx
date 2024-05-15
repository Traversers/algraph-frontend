import React from "react";
import { Menu,Link } from "antd";

const Rightbar = ({ mode }) => {
    const items =[
        {
            label: (
                <Link to = {'/'}></Link>
            ),
        }
    ]
  return (

    <Menu mode={mode} style={{float: 'right'}}></Menu>
  );
};

export default Rightbar;