import { _decorator, Component, Node, CCString, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlotData
 * DateTime = Sun Mar 08 2026 17:36:33 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SlotData.ts
 * FileBasenameNoExtension = SlotData
 * URL = db://assets/Resources/Scripts/SlotsSystem/SlotData.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SlotData')
export class SlotData
{
    @property({ type: CCString })
    private slotID: string = "";

    @property({ type: SpriteFrame })
    private slotFigure: SpriteFrame = null!;

    get id(): string {
        return this.slotID;
    }

    get figure(): SpriteFrame {
        return this.slotFigure;
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
