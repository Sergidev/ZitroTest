import { _decorator, Component, Node, JsonAsset, CCInteger, log, Label, AudioClip, CCFloat, UIOpacity, tween } from 'cc';
import { IQuizSchema } from '../QuizSystem/IQuizSchema';
import { IQuizQuestionData } from '../QuizSystem/IQuizQuestionData';
import { QuizAnswerController } from '../QuizSystem/QuizAnswerController';
import { AudioManager } from '../AudioSystem/AudioManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = QuizQuestionController
 * DateTime = Fri Mar 06 2026 18:55:28 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = QuizQuestionController.ts
 * FileBasenameNoExtension = QuizQuestionController
 * URL = db://assets/Resources/Scripts/QuizSystem/QuizQuestionController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('QuizQuestionController')
export class QuizQuestionController extends Component
{
    @property(JsonAsset)
    public quizJson: JsonAsset = null!;

    @property(Label)
    private questionLabel: Label = null!;

    @property(CCInteger)
    private quizIndex: number = 0;

    @property(CCInteger)
    private quizCorrectAnswers: number = 0;

    @property({ type: CCFloat })
    private answerDelay: number = 0.0;

    @property({ type: UIOpacity })
    private uiOpacity: UIOpacity = null!;

    private quizQuestions: IQuizQuestionData[] = [];

    @property(QuizAnswerController)
    private quizAnswerControllers: QuizAnswerController[] = [];

    @property(AudioClip)
    private correctSound: AudioClip = null!;

    @property(AudioClip)
    private incorrectSound: AudioClip = null!;

    private canReceiveAnswer: boolean = true;

    start()
    {
        this.quizAnswerControllers.forEach((controller) =>
        {
            if (controller && controller.node)
            {
                controller.node.on('ANSWER_SELECTED', this.onSelectedAnswer, this);
            }
        });
    }

    public StartQuiz()
    {
        if (!this.quizJson)
        {
            log("Error: Not JSON file found.");
            return;
        }

        const data = this.quizJson.json as IQuizSchema;

        if (data && data.questions)
        {
            this.quizQuestions = data.questions;
            log("Loaded ${this._questions.length} quiz questions.");

            this.displayQuestion(this.quizIndex);
        }
    }

    private displayQuestion(index: number)
    {
        if (this.quizIndex < this.quizQuestions.length)
        {
            const currentQuestion = this.quizQuestions[index];

            this.questionLabel.string = currentQuestion.question;

            currentQuestion.answers.forEach((ans, i) =>
            {
                this.quizAnswerControllers[i].SetAnswer(ans.text, ans.isCorrect);
            });

            this.node.emit('SET_QUESTION', { index: this.quizIndex, totalQuestions: this.quizQuestions.length });

            this.quizIndex++;
        }
        else
        {
            this.node.emit('END_QUIZ', this.quizCorrectAnswers);
        }
    }

    private onSelectedAnswer(answer: boolean)
    {
        if (this.canReceiveAnswer)
        {
            this.canReceiveAnswer = false;

            if (answer == true)
            {
                this.quizCorrectAnswers++;
                AudioManager.instance.PlaySound(this.correctSound);
            }
            else
            {
                AudioManager.instance.PlaySound(this.incorrectSound);
            }

            this.quizAnswerControllers.forEach((controller) => {
                controller.SetAnswerSprite();
            });

            this.scheduleOnce(() => {
                this.onPerformedAnswer();
            }, this.answerDelay);
        }
    }

    private onPerformedAnswer()
    {
        tween(this.uiOpacity)
            .to(0.3, { opacity: 0 }, { easing: 'sineIn' })
            .call(() =>
            {
                this.canReceiveAnswer = true;

                this.displayQuestion(this.quizIndex);

                tween(this.uiOpacity)
                    .to(0.3, { opacity: 255 }, { easing: 'sineIn' })
                    .start();
            })
            .start();
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
