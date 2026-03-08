import { _decorator, Component, Node, Button, CCString, Label, log, AudioClip } from 'cc';
import { TransitionManager } from '../TransitionSystem/TransitionManager';
import { AudioManager } from '../AudioSystem/AudioManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MenuManager
 * DateTime = Thu Mar 05 2026 19:15:08 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = MenuManager.ts
 * FileBasenameNoExtension = MenuManager
 * URL = db://assets/Resources/Scripts/MenuSystem/MenuManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('MenuManager')
export class MenuManager extends Component
{
    @property(Button)
    private quizButton: Button = null!;

    @property(Button)
    private slotsButton: Button = null!;

    @property({ type: CCString })
    private quizSceneString: string = null!;

    @property({ type: CCString })
    private slotsSceneString: string = null!;

    @property(Label)
    private timeLabel: Label = null!;

    @property(AudioClip)
    private musicBackground: AudioClip = null!;

    private readonly apiUrl = "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Madrid";

    onLoad()
    {
        this.updateTimeFromAPI();

        if (this.quizButton)
            this.quizButton.node.on(Button.EventType.CLICK, this.onQuizClicked, this);

        if (this.slotsButton)
            this.slotsButton.node.on(Button.EventType.CLICK, this.onSlotsClicked, this);
    }

    start()
    {
        AudioManager.instance.PlayMusic(this.musicBackground, false);
    }

    private onQuizClicked(button: Button)
    {
        TransitionManager.instance.ChangeScene(this.quizSceneString);
    }

    private onSlotsClicked(button: Button)
    {
        TransitionManager.instance.ChangeScene(this.slotsSceneString);
    }

    async updateTimeFromAPI()
    {
        try
        {
            const response = await fetch(this.apiUrl);

            if (!response.ok)
                throw new Error("Connection error!");
            else
            {
                const data = await response.json();

                this.updateClockUI(data.hour, data.minute);
            }         
        }
        catch (error)
        {
            log("Error getting time: " + error);
        }

        this.schedule(() =>
        {
            this.updateTimeFromAPI();
        }, 5);
    }

    private updateClockUI(h: number, m: number)
    {
        if (this.timeLabel)
        {
            const hours = ("0" + h).slice(-2);
            const minutes = ("0" + m).slice(-2);

            this.timeLabel.string = hours + ":" + minutes + " (Barcelona)";
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
