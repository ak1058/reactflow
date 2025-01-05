// submit.js
import React from 'react';
import axios from 'axios';
import { useStore } from './store'; 
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
export const SubmitButton = () => {

  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    }));

  const handleSubmit = async (event) => {
      event.preventDefault(); 

      try {
          const response = await axios.post('http://127.0.0.1:8000/pipelines/parse', {
              nodes,
              edges,
          });

      Swal.fire({
        title: 'Pipeline Information',
        html: `
          <div style="font-family: 'Roboto', sans-serif; line-height: 1.6; font-size: 16px; color: #000;">
            <strong style="font-size: 18px;">Number of Nodes:</strong> ${response.data.num_nodes} <br />
            <strong style="font-size: 18px; ">Number of Edges:</strong> ${response.data.num_edges} <br />
            <strong style="font-size: 18px; ">Is DAG:</strong> ${response.data.is_dag} <br />
          </div>
        `,
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          htmlContainer: 'swal-html-container',
        },
      
      });

      console.log('Response from server:', response.data);

      }catch (error) {
        console.error('Error while sending data:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error processing the pipeline.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          customClass: {
          popup: 'swal-err-popup',
          
        },
      });
      }
  };
  return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <Button
                variant="contained"
                
                size="large"
                endIcon={<SendIcon />} 
                onClick={handleSubmit}
                sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    background: 'linear-gradient(to right,rgb(53, 61, 203),rgb(134, 39, 217))'
                }}
            >
                Submit
            </Button>
        </div>
    );
};
