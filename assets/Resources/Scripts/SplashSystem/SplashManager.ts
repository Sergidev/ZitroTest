import { _decorator, Component, Node, tween, Vec3, CCFloat, ProgressBar, CCString, AudioClip } from 'cc';
import { SplashLogoAnimation } from './SplashLogoAnimation';
import { FadeAnimation } from './FadeAnimation';
import { TransitionManager } from '../TransitionSystem/TransitionManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SplashManager
 * DateTime = Wed Mar 04 2026 16:49:29 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SplashManager.ts
 * FileBasenameNoExtension = SplashManager
 * URL = db://assets/Resources/Scripts/SplashManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SplashManager')
export class SplashManager extends Component
{
    @property(SplashLogoAnimation)
    private splashLogoAnimation: SplashLogoAnimation = null!;

    @property(FadeAnimation)
    private textFadeInAnimation: FadeAnimation = null!;

    @property(FadeAnimation)
    private loadingBarFadeInAnimation: FadeAnimation = null!;

    @property({ type: CCFloat })
    private logoDelay: number = 0.0;

    @property({ type: CCFloat })
    private textAnimationDelay: number = 0.0;

    @property({ type: CCFloat })
    private loadingBarAnimationDelay: number = 0.0;

    @property({ type: CCFloat })
    private loadingBarProgressDelay: number = 0.0;

    @property({ type: CCFloat })
    private loadingBarProgressDuration: number = 0.0;

    @property(ProgressBar)
    private loadingBar: ProgressBar = null!;

    @property({ type: CCString })
    private menuSceneString: string = null!;

    start()
    {
        TransitionManager.instance.FadeOut();

        this.scheduleOnce(() => {
            this.splashLogoAnimation.StartPulseAnimation();
        }, this.logoDelay);

        this.scheduleOnce(() => {
            this.textFadeInAnimation.FadeSprite();
        }, this.textAnimationDelay);

        this.scheduleOnce(() => {
            this.loadingBarFadeInAnimation.FadeSprite();
        }, this.loadingBarAnimationDelay);

        this.scheduleOnce(() => {
            this.startLoadingBar();
        }, this.loadingBarProgressDelay);
    }

    private startLoadingBar()
    {
        this.loadingBar.progress = 0;

        tween(this.loadingBar)
            .to(this.loadingBarProgressDuration, { progress: 1 },
                {
                easing: 'sineIn',
                onUpdate: () =>
                {

                }
            })
            .call(() => {
                this.onLoadingComplete();
            })
            .start();
    }

    private onLoadingComplete()
    {
        TransitionManager.instance.ChangeScene(this.menuSceneString);
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
