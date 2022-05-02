import {customElement, state} from "lit/decorators";
import {View} from "Frontend/views/view";
import {BeforeEnterObserver, PreventAndRedirectCommands, Route, Router, RouterLocation} from "@vaadin/router";
import Movement from "Frontend/generated/com/essers/wmsscanner/entity/Movement";
import {MovementEndpoint, PickinlistEndpoint, ProductEndpoint} from "Frontend/generated/endpoints";
import {html} from "lit";
import Product from "Frontend/generated/com/essers/wmsscanner/entity/Product";
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/horizontal-layout';
import { Notification } from '@vaadin/notification';
import {uiStore, wmsStore} from "Frontend/stores/app-store";
import MovementModel from "Frontend/generated/com/essers/wmsscanner/entity/MovementModel";
import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import '@vaadin/icon';
import '@vaadin/icons';

// @ts-ignore
@customElement('scanner-view')
export class MovementsView extends View implements BeforeEnterObserver {

    // @ts-ignore
    @state() id: number | undefined;

    @state() pickinglist: Pickinglist | null =null
    @state() movement: Movement | null =null
    @state() product: Product | null =null
    @state() model:MovementModel|null=null
    @state() palletBarcode = "";
    @state() isCorrectBarcode=true;
    @state() locationBarcode='';
    @state() pl: Pickinglist |null =null;
    @state()  movements: Movement[] = []
    index: number=0;


    async onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands) {
        this.id = parseInt(location.params.id as string);
        console.log("from movements ::::", this.id)
        this.pickinglist=await PickinlistEndpoint.getById(this.id)
        this.movements=await MovementEndpoint.getByPickinglist(this.pickinglist);
       // this.movement= await MovementEndpoint.getById(this.id);
      //  this.product=await ProductEndpoint.getByMovement(this.movement);
        console.log(this.movement)
        console.log("/*/*/*/*/*/*/*/", this.product)
        console.log(this.movement)
     //   console.log("USERNAME from scanner ///////////: ", this.movement.progressuser)

    }
     // @ts-ignore
    render() {
        if (this.movements.length > 0) {
            console.log(this.movement)
            while (this.index < this.movements.length) {
                this.movement = this.movements[this.index]
                if(this.movement.state==="pick"){
                    this.updateMovement();
                    console.log(this.movement)
                    return html`
                    <div class="contents">
                        <vaadin-button theme="primary error" @click="${this.damagereport}">DAMAGE</vaadin-button>
                    </div>

                    <div class="contents">
                        <div class="contents">
                            <vaadin-icon icon="vaadin:building-o"></vaadin-icon>
                            <p>${this.movement.movementId}</p>
                            <p> ${this.movement.state}</p>
                            <p> ${this.movement.productId}</p>
                            <p> ${this.movement.palleteNummer} </p>
                        </div>
                        <div class="scope" @keyup=${this.shiftListener}>
                            <vaadin-icon icon="vaadin:barcode"></vaadin-icon>
                            <p>Scan Pallet barcode</p>
                            <vaadin-text-field
                                    .value=${this.palletBarcode}
                                    @input=${this.updatePalletbarcode}
                            ></vaadin-text-field>
                        </div>
                        <div class="scope" @keyup=${this.shiftListener}>
                            <div class="contents">
                                <p>|${this.movement.locationfrom}</p>
                                <p> ${this.movement.locationto} 
                            </div>
                            <p>Scan Location barcode</p>
                            <vaadin-text-field
                                    ?disabled=${this.isCorrectBarcode}
                                    .value=${this.locationBarcode}
                                    @input=${this.updateLocationBarcode}
                            ></vaadin-text-field>
                        </div>
                        <div class="contents">
                            <vaadin-button theme="primary error" @click="${this.next}">ENTER</vaadin-button>
                        </div>
                    </div>
                `;
                }
                else {
                    this.index++;
                }
            }
            Notification.show("Pickinglist is scanned", {
                position: 'middle', theme: 'success'
            })

        } else {
            return html`
                <div class="container">Pickinglist is scanned</div>
            `;
        }
    }

    next(){
        this.palletBarcode='';
        this.locationBarcode='';
    }
    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'box-border',
            'flex',
            'flex-col',
            'p-m',
            'gap-s',
            'w-full',
            'h-full'
        );
    }
    damagereport(){
        console.log("go to the damage page")
    }

     async updateMovement() {
         await MovementEndpoint.updateUser("processing", wmsStore.username, this.movement);
     }

    async updatePickinglist() {
        await MovementEndpoint.updateState("picked", wmsStore.username, this.movement)
        console.log("updatePickinglist: ", this.movement)
        this.index++;
      //  Router.go("movements/" + this.movement?.pickinglist?.id);


    }
    shiftListener(e: KeyboardEvent) {
        if (e.key === "Shift") {
            this.palletBarcode='';
            this.locationBarcode='';
            this.isCorrectBarcode=true;
        }
    }


    updatePalletbarcode(e: { target: HTMLInputElement }) {
        this.palletBarcode = e.target.value;
        if (this.movement?.palleteNummer === this.palletBarcode) {
            this.isCorrectBarcode = false;
        } else {
            Notification.show("Pallet barcode is not correct!")
        }
    }

    updateLocationBarcode(e: { target: HTMLInputElement }){
        this.locationBarcode=e.target.value;
        if(this.movement?.locationto===this.locationBarcode){
            this.updatePickinglist()
            console.log(MovementEndpoint.getById(this.movement.movementId))
        }

        else {
            Notification.show("Location is not correct")
        }
    }

}
