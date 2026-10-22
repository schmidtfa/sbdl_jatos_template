import {
    JsPsych, JsPsychPlugin, ParameterType, TrialType,
} from 'jspsych';

const info = <const>{
    name: 'hello-world',
    parameters: {
        full_name: {
            type: ParameterType.STRING,
            default: undefined,
        },
    },
};

type Info = typeof info;

class HelloWorldPlugin implements JsPsychPlugin<Info> {
    static info = info;

    constructor(private jsPsych: JsPsych) {}  // eslint-disable-line

    trial(display_element: HTMLElement, trial: TrialType<Info>) {
        display_element.innerHTML = `<p>Hello World!</p><p>Your name is ${trial.full_name}</p>`;
        this.jsPsych.finishTrial();
    }
}

export default HelloWorldPlugin;
