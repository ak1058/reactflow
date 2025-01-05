import React, { useState, useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals, useReactFlow } from 'reactflow';
import { nodeConfigs } from './NodeConfig';
import { TextField, InputLabel, FormControl, FormHelperText, Typography, Grid, Paper,IconButton, Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio  } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../../store';

export const NodeFactory = ({ nodeType, id, data }) => {
  const config = nodeConfigs[nodeType]; // Get the configuration for the node
  const [fields, setFields] = useState({}); 
  const [dynamicHandles, setDynamicHandles] = useState([]); // Store dynamically added handles
  const [fieldVariables, setFieldVariables] = useState({}); 
  const { setEdges, getEdges,setNodes  } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const edges = getEdges();

  useEffect(() => {
    updateNodeInternals(id);
  }, [ dynamicHandles, id, updateNodeInternals]);

  // Handle text input change
  const handleTextChange = (e, fieldLabel) => {
    const newText = e.target.value;
    setFields({ ...fields, [fieldLabel]: newText });

    // Find all variables in the text (multiple occurrences of {{ variableName }})
    const variableMatches = [...newText.matchAll(/{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g)];
    const uniqueVariableNames = new Set(variableMatches.map(match => match[1]));

    const uniqueMatches = [...uniqueVariableNames].map(variableName => {
        return [newText.indexOf(`{{${variableName}}}`), variableName]; // Create an array of index and variableName
      });

    // Create new variables for updates (to avoid mutating constants)
    let updatedFieldVariables = { ...fieldVariables };
    let updatedDynamicHandles = [...dynamicHandles];

    
    uniqueMatches.forEach((match, index) => {
      const variableName = match[1];

      if (updatedFieldVariables[fieldLabel]) {
        if (!updatedFieldVariables[fieldLabel].includes(variableName)) {
            updatedFieldVariables[fieldLabel] += ', ' + variableName;
        }
      } else {
          updatedFieldVariables[fieldLabel] = variableName; // If it doesn't exist, initialize with the variableName
      }

      if (!updatedDynamicHandles.some(handle => handle.id === variableName)) {
        const handlePosition = Position.Left;  
        const topPosition = 40 + (index * 18); 

        updatedDynamicHandles.push({
          id: variableName,
          type: 'target',
          position: handlePosition,
          label: variableName,
          top: `${topPosition}%`,
        });
      }
    });

    // Check for any variables that were previously in the input but are no longer present
    const currentVariables = variableMatches.map(match => match[1]);
    const removedVariables = Object.entries(updatedFieldVariables).reduce((removed, [fieldLabel, variables]) => {
      const storedVariables = variables.split(', ').map(varName => varName.trim());
      // Find which variables are not in currentVariables
      const removedVarsForLabel = storedVariables.filter(varName => !currentVariables.includes(varName));
      if (removedVarsForLabel.length > 0) {
        removed.push(...removedVarsForLabel);
      }
      return removed;
  }, []);

    // Remove handles and edges for the variables that are no longer present
    removedVariables.forEach(removedVar => {
      updatedDynamicHandles = updatedDynamicHandles.filter(handle => handle.id !== removedVar);  
      const updatedEdges = edges.filter(edge => edge.sourceHandle !== `${id}-${removedVar}`);
      setEdges(updatedEdges); // Remove the edges related to this handle
    });

    setFieldVariables(updatedFieldVariables);
    setDynamicHandles(updatedDynamicHandles);
  };

  // Render handles dynamically
  const renderHandles = () => {
    const allHandles = [...config.handles, ...dynamicHandles];
    return allHandles.map(handle => {
      const handlePosition = handle.position === "left" ? Position.Left : Position.Right;
      const labelOffset = handlePosition === Position.Left ? { left: -70 } : { right: -70 };
      const labelTextAlign = handlePosition === Position.Left ? 'right' : 'left'; 
  
      return (
            <>
              <Handle
                  type={handle.type}
                  position={handlePosition}
                  id={`${id}-${handle.id}`}
                  style={{
                    position: 'absolute', 
                    top: handle.top || '50%',
                    transform: 'translateY(-50%)', 
                    background: 'white', // Make the outer circle background transparent
                    width: 16, // Outer circle size
                    height: 16,
                    borderRadius: '50%',
                    border: '2px solid #6364ed', // Border for the outer circle
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                    [handlePosition === 'left' ? 'left' : 'right']: '-10px',
                  }}
              >
                <div
                    style={{
                      width: 8,
                      height: 8,
                      background: "#6364ed",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  ></div>
              </Handle>

              {/* hANDLE Labels */}
              <div
                style={{
                  width: 60,
                  position: 'absolute',
                  top: `calc(${handle.top} + 7%)` || '50%',
                  transform: 'translateY(-50%)',
                  ...labelOffset,
                  fontSize: '12px',
                  color: '#555',
                  marginTop:'0.5rem',
                  textAlign: labelTextAlign
                }}
              >
                {handle.id} 
              </div>
            </>
          );
        });
  };


  // Render fields based on configuration
  const renderFields = () => {
    return config.fields.map((field, index) => {
      switch (field.type) {
        case "input":
          return (
            <Grid item xs={12} key={index}>
              <TextField
                label={field.label}
                variant="outlined"
                fullWidth
                multiline
                minRows={1}
                maxRows={10}
                defaultValue={field.defaultValue}
                value={fields[field.label] || ''}
                onChange={(e) => handleTextChange(e, field.label)}
                inputProps={{
                  style: {
                    resize: 'none',
                  }
                }}
                style={{
                  width: '100%', 
                }}
              />
            </Grid>
          );
        case "dropdown":
          return (
            <Grid item xs={12} key={index}>
              <FormControl fullWidth>
                <InputLabel>{field.label}</InputLabel>
                <NativeSelect
                  value={fields[field.label] || field.defaultValue}
                  onChange={(e) => setFields({ ...fields, [field.label]: e.target.value })}
                  label={field.label}
                  style={{ zIndex: 10 }}
                >
                  {field.options.map((option, i) => (
                    <option key={i} value={option} style={{ zIndex: 10 }}>
                      {option}
                    </option>
                  ))}
                </NativeSelect>
                <FormHelperText>Choose an option</FormHelperText>
              </FormControl>
            </Grid>
          );
        case "span":
          return (
            <Grid item xs={12} key={index}>
              <Typography variant="body1">{field.text}</Typography>
            </Grid>
          );
        
        case "checkbox":
        return (
          <Grid item xs={12} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fields[field.label] || false}
                  onChange={(e) => setFields({ ...fields, [field.label]: e.target.checked })}
                  color="primary"
                />
              }
              label={field.label}
            />
          </Grid>
        );

        case "radiobutton":
          return (
            <Grid item xs={12} key={index}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{field.label}</FormLabel>
                <RadioGroup
                  value={fields[field.label] || field.defaultValue}
                  onChange={(e) => setFields({ ...fields, [field.label]: e.target.value })}
                >
                  {field.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          );

        default:
          return null;
      }
    });
  };

  const handleDelete = () => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
      
      const [type] = id.split('-');

      // Remove the ID from the store
      useStore.setState((state) => {
        const updatedIDs = { ...state.nodeIDs };
        if (updatedIDs[type]) {
          delete updatedIDs[type]; // Delete the specific node ID type
        }
        return { nodeIDs: updatedIDs };
      });
    };

  return (
    <Paper style={{ width: 250, padding: 20, border: '1px solid #ccc', borderRadius: 8, boxShadow: '0 0 15px rgba(99,101,239,255)' }}>
      <IconButton
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            boxShadow: '0 0px 15px rgba(99,101,239,255)',
            padding: 2,
            border: '1px solid rgba(99,101,239,255)', // Border with matching color
            borderRadius: '50%' // Reduce padding for a smaller button
          }}
          size="small">
          <CloseIcon style={{ color: 'black', fontSize: '14px' }} /> 
      </IconButton>

      <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
        {config.title}_{id.split('-')[1]}
      </Typography>

      <Grid container spacing={2}>
        {renderFields()}
      </Grid>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
        {renderHandles()}
      </div>
    </Paper>
  );
};
