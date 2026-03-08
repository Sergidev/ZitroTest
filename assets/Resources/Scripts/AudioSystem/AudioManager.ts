import { _decorator, Component, Node, AudioSource, AudioClip, game } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = AudioManager
 * DateTime = Wed Mar 04 2026 23:17:19 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = AudioManager.ts
 * FileBasenameNoExtension = AudioManager
 * URL = db://assets/Resources/Scripts/AudioSystem/AudioManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('AudioManager')
export class AudioManager extends Component {

    public static instance: AudioManager = null!;

    @property(AudioSource)
    public audioSourceLoop: AudioSource = null!;

    @property(AudioSource)
    public audioSourceSounds: AudioSource = null!;

    onLoad()
    {
        if (AudioManager.instance === null)
        {
            AudioManager.instance = this;

            game.addPersistRootNode(this.node);
        }
        else
        {
            this.node.destroy();
            return;
        }
    }

    public PlayMusic(clip: AudioClip, restartMusic: boolean)
    {
        if (this.audioSourceLoop && clip)
        {
            if (this.audioSourceLoop.playing)
            {
                if (restartMusic) {
                    this.audioSourceLoop.clip = clip;
                    this.audioSourceLoop.play();
                }
                else
                {
                    //Continue with current music
                }
            }
            else
            {
                this.audioSourceLoop.clip = clip;
                this.audioSourceLoop.play();
            }
        }
    }

    public PlaySound(clip: AudioClip)
    {
        if (this.audioSourceSounds && clip)
        {
            this.audioSourceSounds.playOneShot(clip, this.audioSourceSounds.volume);
        }
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
