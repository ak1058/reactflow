import React from 'react';
import { NodeFactory } from './nodeUtils/NodeFactory';

export const PromptNode = ({ id, data }) => {
  return <NodeFactory nodeType="PromptNode" id={id} data={data} />;
};