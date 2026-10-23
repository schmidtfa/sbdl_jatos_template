import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

import instructions from './assets/instructions/instructions.html?raw';

export default function get_instructions() {
    return {
        type: htmlKeyboardResponse,
        stimulus: instructions,
    };
}
