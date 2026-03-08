import { _decorator, Component, CCString } from 'cc';
import { Slot } from './Slot';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlotPosition
 * DateTime = Sun Mar 08 2026 18:09:48 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SlotPosition.ts
 * FileBasenameNoExtension = SlotPosition
 * URL = db://assets/Resources/Scripts/SlotsSystem/SlotPosition.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SlotPosition')
export class SlotPosition extends Component
{
    @property({ type: CCString })
    private SlotPositionID: string = null!;

    @property({ type: Slot })
    private referenceSlot: Slot = null!;

    get idPosition(): string
    {
        return this.SlotPositionID;
    }

    get idSlot(): string
    {
        return this.referenceSlot.id;
    }

    public AssignSlot(sl: Slot)
    {
        this.referenceSlot = sl;
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
