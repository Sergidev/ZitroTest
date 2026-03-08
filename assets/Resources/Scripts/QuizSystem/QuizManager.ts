import { _decorator, Component, Node, Button, CCString, AudioClip, CCInteger, Label } from 'cc';
import { TransitionManager } from '../TransitionSystem/TransitionManager';
import { QuizQuestionController } from '../QuizSystem/QuizQuestionController';
import { AudioManager } from '../AudioSystem/AudioManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = QuizManager
 * DateTime = Fri Mar 06 2026 18:55:01 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = QuizManager.ts
 * FileBasenameNoExtension = QuizManager
 * URL = db://assets/Resources/Scripts/QuizSystem/QuizManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('QuizManager')
export class QuizManager extends Component
{
    @property(Node)
    private quizParent: Node = null!;

    @property(Node)
    private quizCompletedParent: Node = null!;

    @property(Label)
    private indexLabel: Label = null!;

    @property(Label)
    private correctAnswersLabel: Label = null!;

    @property(Button)
    public menuButton: Button = null!;

    @property({ type: CCString })
    private menuSceneString: string = null!;

    @property({ type: QuizQuestionController })
    private quizQuestionController: QuizQuestionController = null!;

    @property(AudioClip)
    private tadaSound: AudioClip = null!;

    onLoad()
    {
        if (this.menuButton)
            this.menuButton.node.on(Button.EventType.CLICK, this.onMenuClicked, this);

        this.quizQuestionController.node.on('SET_QUESTION', this.setQuizIndex, this);

        this.quizQuestionController.node.on('END_QUIZ', this.onEndQuiz, this);
    }

    start()
    {
        this.quizQuestionController.StartQuiz();
    }

    private onMenuClicked()
    {
        TransitionManager.instance.ChangeScene(this.menuSceneString);
    }

    private setQuizIndex(data: { index: number, totalQuestions: number })
    {
        const actualIndex = data.index + 1;
        this.indexLabel.string = "Question " + actualIndex + "/" + data.totalQuestions;
    }

    private onEndQuiz(correctAnswers: number)
    {
        this.quizParent.active = false;

        this.correctAnswersLabel.string = "Correct answers: " + correctAnswers;

        AudioManager.instance.PlaySound(this.tadaSound);

        this.quizCompletedParent.active = true;
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
