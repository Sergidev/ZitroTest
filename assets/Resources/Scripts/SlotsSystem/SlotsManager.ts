import { _decorator, Component, Node, Button, CCString, AudioClip, CCInteger, Label } from 'cc';
import { TransitionManager } from '../TransitionSystem/TransitionManager';
import { SlotsMachineController } from './SlotsMachineController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlotsManager
 * DateTime = Sun Mar 08 2026 09:08:24 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SlotsManager.ts
 * FileBasenameNoExtension = SlotsManager
 * URL = db://assets/Resources/Scripts/SlotsSystem/SlotsManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SlotsManager')
export class SlotsManager extends Component
{
    @property(Button)
    public menuButton: Button = null!;

    @property(Button)
    public spinButton: Button = null!;

    @property({ type: CCString })
    private menuSceneString: string = null!;

    @property({ type: SlotsMachineController })
    private slotsMachineController: SlotsMachineController = null!;

    onLoad()
    {
        if (this.menuButton)
            this.menuButton.node.on(Button.EventType.CLICK, this.onMenuClicked, this);

        if (this.spinButton)
            this.spinButton.node.on(Button.EventType.CLICK, this.onSpinClicked, this);

        this.slotsMachineController.node.on('SLOTS_STOPPED', this.onSlotsStopped, this);
    }

    private onSpinClicked()
    {
        this.slotsMachineController.SpinSlots();

        this.spinButton.interactable = false;
        this.menuButton.interactable = false;
    }

    private onMenuClicked()
    {
        TransitionManager.instance.ChangeScene(this.menuSceneString);
    }

    private onSlotsStopped()
    {
        this.spinButton.interactable = true;
        this.menuButton.interactable = true;
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
