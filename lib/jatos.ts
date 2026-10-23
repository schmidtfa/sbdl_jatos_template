import {initJsPsych, JsPsych, JsPsychExtension, JsPsychExtensionInfo} from "jspsych";

type JatosApi = {
    submitResultData: (
        data: string,
        onSuccess?: () => void
    ) => Promise<unknown>;
    startNextComponent: () => void;
};

const jatosWindow = window as Window & {
    jatos?: JatosApi;
};

export class Jatos implements JsPsychExtension {
    static info: JsPsychExtensionInfo = {
        name: "Jatos",
    };

    constructor(private jsPsych: JsPsych) {}

    initialize(): Promise<void> {
        return new Promise((resolve) => {
            if (jatosWindow.jatos) {
                const jatos = jatosWindow.jatos;
                const settings = this.jsPsych.getInitSettings();
                settings['on_finish'] = () => {
                    const resultJson = this.jsPsych.data.get().json();
                    jatos.submitResultData(resultJson, jatos.startNextComponent);
                };
            }
            resolve();
        });
    };

    on_start(): void {};

    on_load(): void {};

    on_finish(): Record<string, unknown> {
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
