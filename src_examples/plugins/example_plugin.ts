import {
    JsPsych, JsPsychPlugin, ParameterType, TrialType,
} from 'jspsych';

const info = {
    name: 'hello-world',
    version: '1.0.0',
    parameters: {
        full_name: {
            type: ParameterType.STRING,
            default: undefined,
        },
    },
    data: {
        full_name: {
            type: ParameterType.STRING,
        },
    },
} as const;

type Info = typeof info;

class HelloWorldPlugin implements JsPsychPlugin<Info> {
    static info = info;

    constructor(private jsPsych: JsPsych) {}   

    trial(display_element: HTMLElement, trial: TrialType<Info>) {
        display_element.innerHTML = `
        <p>Hello World!</p>
        <p>Your name is ${trial.full_name}</p>
        <button id="continue-btn">Continue</button>
    `;

        const button = display_element.querySelector('#continue-btn');

        button?.addEventListener('click', () => {
            this.jsPsych.finishTrial({
                full_name: trial.full_name,
            });
        });
    }
}

export default HelloWorldPlugin;
