import React from 'react';
import { NodeFactory } from './NodeFactory';

export const NoteNode = ({ id, data }) => {
  return <NodeFactory nodeType="NoteNode" id={id} data={data} />;
};