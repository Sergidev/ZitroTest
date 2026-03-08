import { _decorator, CCInteger, Component, AudioClip, UIOpacity, tween, CCFloat } from 'cc';
import { SlotColumnController } from '../SlotsSystem/SlotColumnController';
import { AudioManager } from '../AudioSystem/AudioManager';
import { SlotData } from './SlotData';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlotsMachineController
 * DateTime = Sun Mar 08 2026 09:08:44 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SlotsMachineController.ts
 * FileBasenameNoExtension = SlotsMachineController
 * URL = db://assets/Resources/Scripts/SlotsSystem/SlotsMachineController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SlotsMachineController')
export class SlotsMachineController extends Component
{
    @property(SlotColumnController)
    private slotColumnControllers: SlotColumnController[] = [];

    @property({ type: UIOpacity })
    private jackpotOpacity: UIOpacity = null!;

    @property({ type: CCInteger })
    private secondsMinSpinning: number = 3;

    @property({ type: CCInteger })
    private secondsMaxSpinning: number = 5;

    @property({ type: CCFloat})
    private jackpotOpacityTime: number = 0.3;

    @property({ type: CCInteger })
    private secondsDelayColumns: number = 2;

    @property({ type: CCInteger })
    private slotPositionVerify: number = 2;

    @property({ type: [SlotData] })
    private slotsData: SlotData[] = [];

    @property(AudioClip)
    private soundSlotStopped: AudioClip = null!;

    @property(AudioClip)
    private soundSlotSpin: AudioClip = null!;

    @property(AudioClip)
    private soundPrizeFanfare: AudioClip = null!;

    private stoppedColumnsCount: number = 0;
    private isBusy: boolean = false;

    start()
    {
        this.slotColumnControllers.forEach((column) =>
        {
            if (column)
            {
                column.SetColumnSlots([...this.slotsData]);
                column.node.on('COLUMN_STOPPED', this.OnColumnStopped, this);
            }
        });
    }

    public async SpinSlots()
    {
        if (this.isBusy)
            return;

        tween(this.jackpotOpacity)
            .to(this.jackpotOpacityTime, { opacity: 0 })
            .start();

        this.isBusy = true;
        this.stoppedColumnsCount = 0;

        for (let i = 0; i < this.slotColumnControllers.length; i++)
        {
            AudioManager.instance.PlaySound(this.soundSlotSpin);

            this.slotColumnControllers[i].StartSpinning();

            if (i < this.slotColumnControllers.length - 1)
            {
                await this.Wait(this.secondsDelayColumns * 1000);
            }
        }

        const randomSpinTime = (Math.random() * (this.secondsMaxSpinning - this.secondsMinSpinning) + this.secondsMinSpinning) * 1000;
        await this.Wait(randomSpinTime);

        for (let i = 0; i < this.slotColumnControllers.length; i++)
        {
            this.slotColumnControllers[i].StopColumn();

            if (i < this.slotColumnControllers.length - 1)
            {
                await this.Wait(this.secondsDelayColumns * 1000);
            }
        }
    }

    private Wait(ms: number): Promise<void>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private OnColumnStopped()
    {
        AudioManager.instance.PlaySound(this.soundSlotStopped);

        this.stoppedColumnsCount++;

        if (this.stoppedColumnsCount >= this.slotColumnControllers.length)
        {
            this.isBusy = false;
            this.SlotsVerification();
        }
    }

    private SlotsVerification()
    {
        this.node.emit('SLOTS_STOPPED');

        const results = this.slotColumnControllers.map(col => col.GetCentralID(this.slotPositionVerify));

        const isWinner = results.every(id => id === results[0] && id !== "");

        if (isWinner)
        {
            this.TriggerCelebration();
        }
    }

    private TriggerCelebration()
    {
        AudioManager.instance.PlaySound(this.soundPrizeFanfare);

        tween(this.jackpotOpacity)
            .to(this.jackpotOpacityTime, { opacity: 255 })
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
