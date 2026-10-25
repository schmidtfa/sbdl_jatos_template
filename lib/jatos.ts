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
        version: "0.1.0",
        data: {},
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

export function initJsPsychWithJatos(
    options: Parameters<typeof initJsPsych>[0] = {}
): JsPsych {
    return initJsPsych({
        ...options,
        extensions: [
            ...(options.extensions ?? []),
            { type: Jatos },
        ],
    });
}
