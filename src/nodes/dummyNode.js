import React from 'react';
import { NodeFactory } from './NodeFactory';

export const DummyNode = ({ id, data }) => {
  return <NodeFactory nodeType="DummyNode" id={id} data={data} />;
};