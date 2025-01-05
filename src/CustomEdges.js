import React from 'react';
import { getSmoothStepPath, useReactFlow } from 'reactflow';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton  } from '@mui/material';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const { setEdges } = useReactFlow();

  
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <path
        id={id}
        style={{
          stroke: '#222',
          strokeWidth: 2,
          fill: 'none',
          ...style,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={20}
        height={20}
        x={labelX - 10}
        y={labelY - 10}
        style={{ cursor: 'pointer', borderRadius: '50%', }}
      >
        <IconButton
          onClick={handleDelete}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            border: '1px solid rgba(99,101,239,255)', 
            borderRadius: '50%',
            boxShadow: '0 0px 15px rgba(99,101,239,255)',
          }}
          size = 'small'
        >
          <CloseIcon style={{ fontSize: '14px', color: '#222' }} />
        </IconButton>
      </foreignObject>
    </>
  );
};


