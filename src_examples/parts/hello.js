import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

export default function get_hello() {
    return {
        type: htmlKeyboardResponse,
        stimulus: '<p>Welcome to this experiment.</p>'
            + '<p>This different!</p>'
            + '<p>Please press any key to begin.</p>',
    };
}
