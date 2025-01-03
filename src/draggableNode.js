// draggableNode.js

export const DraggableNode = ({ type, label, Icon  }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          background: 'linear-gradient(to right,rgb(53, 61, 203),rgb(134, 39, 217))',
          
          justifyContent: 'center', 
          flexDirection: 'column'
        }} 
        draggable
      >
          {Icon && <Icon style={{ color: '#fff', fontSize: '22px' }} />}
          <span style={{ color: '#fff', fontSize: "13px"}}>{label}</span>
      </div>
    );
  };
  