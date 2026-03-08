import { _decorator, Component, Node, tween, CCInteger, CCFloat } from 'cc';
import { Slot } from '../SlotsSystem/Slot';
import { SlotData } from '../SlotsSystem/SlotData';
import { SlotPosition } from '../SlotsSystem/SlotPosition';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlotColumnController
 * DateTime = Sun Mar 08 2026 17:14:00 GMT+0100 (hora estándar de Europa central)
 * Author = Servigadev
 * FileBasename = SlotColumnController.ts
 * FileBasenameNoExtension = SlotColumnController
 * URL = db://assets/Resources/Scripts/SlotsSystem/SlotColumnController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SlotColumnController')
export class SlotColumnController extends Component
{
    @property({ type: [Slot] })
    private slotControllers: Slot[] = [];

    @property({ type: [SlotPosition] })
    private slotPositions: SlotPosition[] = [];

    @property
    private durationPerStep: number = 0.15;

    private isStopping: boolean = false;

    public SetColumnSlots(slotsData: SlotData[])
    {
        const availableData = [...slotsData];

        this.slotControllers.forEach((slot, index) =>
        {
            if (availableData.length === 0) return;
            const randomIndex = Math.floor(Math.random() * availableData.length);
            const selectedData = availableData.splice(randomIndex, 1)[0];

            if (slot && selectedData) {
                slot.SetSlot(selectedData.id, selectedData.figure);
            }

            if (this.slotPositions[index] && slot) {
                this.slotPositions[index].AssignSlot(slot);
            }
        });
    }

    public async StartSpinning(): Promise<void>
    {
        this.isStopping = false;

        while (!this.isStopping)
        {
            await this.PerformSingleStep();
        }

        for (let i = 0; i < 2; i++)
        {
            await this.PerformSingleStep();
        }

        this.node.emit('COLUMN_STOPPED');
    }

    public StopColumn()
    {
        this.isStopping = true;
    }

    private async PerformSingleStep(): Promise<void>
    {
        const movePromises: Promise<void>[] = [];

        this.slotControllers.forEach((slot, index) =>
        {
            let targetIndex: number;

            if (index === this.slotControllers.length - 1)
            {
                slot.node.setPosition(this.slotPositions[0].node.position);
                targetIndex = 0;
            }
            else
            {
                targetIndex = index + 1;
            }

            const targetPos = this.slotPositions[targetIndex];

            const p = new Promise<void>((resolve) =>
            {
                tween(slot.node)
                    .to(this.durationPerStep, { position: targetPos.node.position }, { easing: 'linear' })
                    .call(() =>
                    {
                        targetPos.AssignSlot(slot);
                        resolve();
                    })
                    .start();
            });

            movePromises.push(p);
        });

        await Promise.all(movePromises);

        const lastSlot = this.slotControllers.pop();
        if (lastSlot) this.slotControllers.unshift(lastSlot);
    }

    public GetCentralID(index: number): string
    {
        return this.slotPositions[index].idSlot;
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
