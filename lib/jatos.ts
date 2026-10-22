import {initJsPsych, JsPsych, JsPsychExtension, JsPsychExtensionInfo} from "jspsych";

interface InitializeParameters {}

interface OnStartParameters {}

interface OnLoadParameters {}

interface OnFinishParameters {}

declare const window: any;

export class Jatos implements JsPsychExtension {
    static info: JsPsychExtensionInfo = {
        name: "Jatos",
    };

    constructor(private jsPsych: JsPsych) {}

    initialize({}: InitializeParameters): Promise<void> {
        return new Promise((resolve) => {
            if ('jatos' in window) {
                let settings = this.jsPsych.getInitSettings();
                settings['on_finish'] = () => {
                    let resultJson = this.jsPsych.data.get().json();
                    window.jatos.submitResultData(resultJson, window.jatos.startNextComponent);
                };
            }
            resolve();
        });
    };

    on_start({}: OnStartParameters): void {};

    on_load({}: OnLoadParameters): void {};

    on_finish({}: OnFinishParameters): { [key: string]: any }{
        return {};
    };
}

export function initJsPsychWithJatos(options?) : JsPsych {
    if(typeof options === 'undefined') {
        options = {
            extensions: [
                { type: Jatos },
            ]
        }
    }

    if ('extensions' !in options) {
        options.extensions = [];
    }

    options.extensions.push({ type: Jatos });

    return initJsPsych(options);
}
