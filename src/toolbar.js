// toolbar.js

import { DraggableNode } from './draggableNode';
import InputIcon from '@mui/icons-material/Input';
import ApiIcon from '@mui/icons-material/Api';
import OutputIcon from '@mui/icons-material/Output';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InfoIcon from '@mui/icons-material/Info';
import PsychologyIcon from '@mui/icons-material/Psychology';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import IntegrationInstructionsIcon from '@mui/icons-material/CompareArrows';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' Icon={InputIcon} />
                <DraggableNode type='llm' label='LLM' Icon={PsychologyIcon} />
                <DraggableNode type='customOutput' label='Output' Icon={OutputIcon} />
                <DraggableNode type='text' label='Text' Icon={TextFieldsIcon} />
                <DraggableNode type='dummy' label='Dummy' Icon={InfoIcon} />
                <DraggableNode type='prompt' label='Prompt' Icon={ApiIcon} />
                <DraggableNode type='openAi' label='OpenAI' Icon={OpenInBrowserIcon} />
                <DraggableNode type='integration' label='Integration' Icon={IntegrationInstructionsIcon} />
                <DraggableNode type='note' label='Note' Icon={StickyNote2Icon} />
            </div>
        </div>
    );
};
