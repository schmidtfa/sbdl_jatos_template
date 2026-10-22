import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

export default function get_hello() {
    return {
        type: htmlKeyboardResponse,
        stimulus: '<p>Thank you for participating</p>'
            + '<p>Please press any key to end this.</p>',
    };
}
