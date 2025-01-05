import React from 'react';
import { NodeFactory } from './nodeUtils/NodeFactory';    

export const SampleNode = ({ id, data }) => {
    return <NodeFactory nodeType="SampleNode" id={id} data={data} />;
}
