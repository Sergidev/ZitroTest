import { _decorator, Component, Node, CCString, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Slot
 * DateTime = Sun Mar 08 2026 09:25:47 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = Slot.ts
 * FileBasenameNoExtension = Slot
 * URL = db://assets/Resources/Scripts/SlotsSystem/Slot.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('Slot')
export class Slot extends Component
{
    @property({ type: CCString })
    private FigureID: string = null!;

    @property(Sprite)
    private figureSprite: Sprite = null!;

    get id(): string
    {
        return this.FigureID;
    }

    public SetSlot(id: string, spr: SpriteFrame)
    {
        this.FigureID = id;
        this.figureSprite.spriteFrame = spr;
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
