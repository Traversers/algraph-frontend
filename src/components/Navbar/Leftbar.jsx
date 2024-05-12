import React from "react";
import { Menu,Link } from "antd";

const Leftbar = ({ mode }) => {
    const items =[
        {
            label: (
                <Link to = {'/'}></Link>
            ),
        }
    ]
  return (

    <Menu mode={mode} style={{float: 'left'}}></Menu>
  );
};

export default Leftbar;