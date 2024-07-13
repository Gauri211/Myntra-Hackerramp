import React from 'react';

const GradientBox = () => {
  const gradientStyle = {
    height: '65vh',
    width: '100vw',
    marginTop: '95vh',
    background: 'linear-gradient(to bottom, #d3e1fc, #7292f5)',
    paddingbottom:'15vh'
  };

  return (
    <div style={gradientStyle}>
      {/* Your content here */}
      Hello World
    </div>
  );
};

export default GradientBox;

