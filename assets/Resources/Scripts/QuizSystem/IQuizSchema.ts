
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = IQuizSchema
 * DateTime = Sun Mar 08 2026 11:08:11 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = IQuizSchema.ts
 * FileBasenameNoExtension = IQuizSchema
 * URL = db://assets/Resources/Scripts/QuizSystem/IQuizSchema.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
export interface IQuizSchema {
    questions: Array<{
        question: string;
        answers: Array<{
            text: string;
            isCorrect: boolean;
        }>;
    }>;
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
