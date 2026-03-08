import { _decorator, Component, Node, tween, Vec3, CCFloat, Sprite, UIOpacity, AudioClip } from 'cc';
import { AudioManager } from '../AudioSystem/AudioManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SplashLogoAnimation
 * DateTime = Wed Mar 04 2026 16:27:07 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SplashLogoAnimation.ts
 * FileBasenameNoExtension = SplashLogoAnimation
 * URL = db://assets/Resources/Scripts/SplashLogoAnimation.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SplashLogoAnimation')
export class SplashLogoAnimation extends Component
{
    @property({ type: Sprite })
    private sprite: Sprite = null!;

    @property({ type: Sprite })
    private shineSprite: Sprite = null!;

    @property(CCFloat)
    private fadeDuration: number = 0.0;

    @property({ type: CCFloat })
    private targetShineScale: number = 0.0;

    @property({ type: CCFloat })
    private scaleDuration: number = 0.0;

    @property({ type: CCFloat })
    private scaleShineDuration: number = 0.0;

    @property({ type: CCFloat })
    private punchDuration: number = 0.0;

    @property({ type: CCFloat })
    private targetScale: number = 0.0;

    @property(UIOpacity)
    private uiShineOppacity: UIOpacity = null!;

    @property(AudioClip)
    private logoSound: AudioClip = null!;

    public StartPulseAnimation()
    {
        tween(this.node)
            .to(this.scaleDuration, { scale: new Vec3(this.targetScale, this.targetScale, this.targetScale) }, { easing: 'quadInOut' })
            .to(this.punchDuration, { scale: new Vec3(this.targetScale * 1.1, this.targetScale * 1.1, this.targetScale * 1.1) }, { easing: 'circOut' })
            .to(this.punchDuration, { scale: new Vec3(this.targetScale, this.targetScale, this.targetScale) }, { easing: 'bounceOut' })
            .call(() =>
            {
                AudioManager.instance.PlaySound(this.logoSound);

                tween(this.shineSprite.node)
                    .to(this.scaleShineDuration, { scale: new Vec3(this.targetShineScale, this.targetShineScale, this.targetShineScale) }, { easing: 'quadIn' })
                    .start();

                tween(this.uiShineOppacity)
                    .to(this.fadeDuration, { opacity: 0.0 })
                    .start();

                this.sprite.grayscale = false;
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
