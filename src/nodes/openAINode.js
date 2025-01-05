import React from 'react';
import { NodeFactory } from './nodeUtils/NodeFactory';

export const OpenAiNode = ({ id, data }) => {
  return <NodeFactory nodeType="OpenAiNode" id={id} data={data} />;
};