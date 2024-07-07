import React from 'react';
import { Oval } from 'react-loader-spinner';
import './index.css'; 

export const Loader = () => {
  return (
    <div className="loader-container">
      <Oval
        height={80}
        width={80}
        color="#007BFF"
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#0056b3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
