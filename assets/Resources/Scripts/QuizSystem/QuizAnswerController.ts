
import { _decorator, Component, Sprite, Label, CCBoolean, Button, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = QuizAnswerController
 * DateTime = Fri Mar 06 2026 19:29:17 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = QuizAnswerController.ts
 * FileBasenameNoExtension = QuizAnswerController
 * URL = db://assets/Resources/Scripts/QuizSystem/QuizAnswerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('QuizAnswerController')
export class QuizAnswerController extends Component
{
    @property(Label)
    private answerLabel: Label = null!;

    @property(Sprite)
    private buttonSprite: Sprite = null!;

    @property(SpriteFrame)
    private correctSpriteFrame: SpriteFrame = null!;

    @property(SpriteFrame)
    private incorrectSpriteFrame: SpriteFrame = null!;

    @property(SpriteFrame)
    private standardSpriteFrame: SpriteFrame = null!;

    @property(CCBoolean)
    private answerCorrect: boolean = false;

    @property(Button)
    private answerButton: Button = null!;

    start()
    {
        if (this.answerButton)
            this.answerButton.node.on(Button.EventType.CLICK, this.selectAnswer, this);
    }

    public SetAnswer(answer: string, correct: boolean)
    {
        this.buttonSprite.spriteFrame = this.standardSpriteFrame;

        this.answerLabel.string = answer;
        this.answerCorrect = correct;
    }

    public SetAnswerSprite()
    {
        if (this.answerCorrect == true)
        {
            this.buttonSprite.spriteFrame = this.correctSpriteFrame;
        }
        else
        {
            this.buttonSprite.spriteFrame = this.incorrectSpriteFrame;
        }
    }

    private selectAnswer()
    {
        this.node.emit('ANSWER_SELECTED', this.answerCorrect);
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
