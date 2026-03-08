import { _decorator, Component, Node } from 'cc';
import { IQuizAnswer } from '../QuizSystem/IQuizAnswer';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = IQuizQuestionData
 * DateTime = Sun Mar 08 2026 11:13:02 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = IQuizQuestionData.ts
 * FileBasenameNoExtension = IQuizQuestionData
 * URL = db://assets/Resources/Scripts/QuizSystem/IQuizQuestionData.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 export interface IQuizQuestionData {
    question: string;
    answers: IQuizAnswer[];
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
