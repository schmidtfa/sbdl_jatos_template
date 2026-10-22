import HtmlKeyboardResponsePlugin from '@jspsych/plugin-html-keyboard-response';

export default function get_fixcross(duration) {
    return {
        type: HtmlKeyboardResponsePlugin,
        stimulus: '<h1>+</h1>',
        choices: 'NO_KEYS',
        trial_duration: duration,
    };
}
