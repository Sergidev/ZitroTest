import { _decorator, Component, Node, tween, Vec3, CCFloat, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FadeAnimation
 * DateTime = Wed Mar 04 2026 17:33:44 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = FadeAnimation.ts
 * FileBasenameNoExtension = FadeAnimation
 * URL = db://assets/Resources/Scripts/SplashSystem/FadeAnimation.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('FadeAnimation')
export class FadeAnimation extends Component
{
    @property(UIOpacity)
    private uiOppacity: UIOpacity = null!;

    @property(CCFloat)
    public fadeDuration: number = 0.0;

    @property(CCFloat)
    public targetOppacity: number = 0.0;

    public FadeSprite()
    {
        tween(this.uiOppacity)
            .to(this.fadeDuration, { opacity: this.targetOppacity })
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
