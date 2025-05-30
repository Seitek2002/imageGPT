import React from 'react';
import ContentLoader from 'react-content-loader';

const AssistantSkeleton = ({ ...props }) => {
  return (
    <ContentLoader
      speed={2}
      width={360}
      height={80}
      viewBox='0 0 360 80'
      backgroundColor='#f3f3f3'
      foregroundColor='#ababab'
      {...props}
    >
      <circle cx='26' cy='25' r='25' />
      <rect x='64' y='8' rx='0' ry='0' width='100%' height='12' />
      <rect x='64' y='30' rx='0' ry='0' width='50%' height='8' />
    </ContentLoader>
  );
};

export default AssistantSkeleton;
