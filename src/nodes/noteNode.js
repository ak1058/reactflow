import React from 'react';
import { NodeFactory } from './nodeUtils/NodeFactory';

export const NoteNode = ({ id, data }) => {
  return <NodeFactory nodeType="NoteNode" id={id} data={data} />;
};