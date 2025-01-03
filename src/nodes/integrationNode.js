import React from 'react';
import { NodeFactory } from './NodeFactory';

export const IntegrationNode = ({ id, data }) => {
  return <NodeFactory nodeType="IntegrationNode" id={id} data={data} />;
};