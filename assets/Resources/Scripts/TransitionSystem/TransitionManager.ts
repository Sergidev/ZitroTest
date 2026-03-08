import { _decorator, Component, Node, UIOpacity, director, game, Director, tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TransitionManager
 * DateTime = Wed Mar 04 2026 23:59:21 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = TransitionManager.ts
 * FileBasenameNoExtension = TransitionManager
 * URL = db://assets/Resources/Scripts/TransitionManagerSystem/TransitionManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('TransitionManager')
export class TransitionManager extends Component
{
    public static instance: TransitionManager = null!;

    @property(UIOpacity)
    private uiOpacity: UIOpacity = null!;

    private canChangeScene: boolean = true;

    onLoad()
    {
        if (TransitionManager.instance == null)
        {
            TransitionManager.instance = this;

            game.addPersistRootNode(this.node);
        }
        else
        {
            this.node.destroy();
        }
    }

    public ChangeScene(sceneName: string)
    {
        if (this.canChangeScene)
        {
            this.canChangeScene = false;

            tween(this.uiOpacity)
                .to(0.5, { opacity: 255 }, { easing: 'sineIn' })
                .call(() => {
                    director.loadScene(sceneName, (err, scene) => {
                        if (!err) {
                            this.FadeOut();
                        } else {
                            console.error("Failed to load scene: ", err);
                        }
                    });
                })
                .start();
        }       
    }

    public FadeOut()
    {
        tween(this.uiOpacity)
            .to(0.5, { opacity: 0 }, { easing: 'sineIn' })
            .call(() => {
                this.canChangeScene = true;
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
