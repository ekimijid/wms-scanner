import {customElement, state} from "lit/decorators";
import {View} from "Frontend/views/view";
import {BeforeEnterObserver, PreventAndRedirectCommands, Router, RouterLocation} from "@vaadin/router";
import Movement from "Frontend/generated/com/essers/wmsscanner/entity/Movement";
import {MovementEndpoint, PickinlistEndpoint, ProductEndpoint} from "Frontend/generated/endpoints";
import {html} from "lit";
import Product from "Frontend/generated/com/essers/wmsscanner/entity/Product";
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/horizontal-layout';
import {Notification} from '@vaadin/notification';
import {wmsStore} from "Frontend/stores/app-store";
import MovementModel from "Frontend/generated/com/essers/wmsscanner/entity/MovementModel";
import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import '@vaadin/icon';
import '@vaadin/icons';
import {css} from "@vaadin/vaadin-themable-mixin";
import {ConnectionState, ConnectionStateStore} from "@vaadin/common-frontend";

// @ts-ignore
@customElement('scanner-view')
export class MovementsView extends View implements BeforeEnterObserver {

    // @ts-ignore
    @state() id: number | undefined;

    @state() pickinglist: Pickinglist | null = null
    @state() movement: Movement | null = null
    @state() product: Product | null = null
    @state() model: MovementModel | null = null
    @state() palletBarcode = "";
    @state() isCorrectBarcode = true;
    @state() locationBarcode = '';
    @state() pl: Pickinglist | null = null;
    @state() movements: Movement[] = []
    index: number = 0;
    @state() offline = false;
    static styles = css`
    .contents {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      margin-bottom: 60px;
    }

    @media (max-width: 600px) {
      .contents {
        grid-template-columns: 1fr;
      }
    }

    .scope {
      border: 3px dashed gray;
      padding: 20px;
    }

    textarea {
      border: 1px solid gray;
      height: 100%;
      width: 100%;
    }
    
    .v-horizontal > .v-spacing {
    width: 50px;
}
 `;

    async onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands) {
        this.id = parseInt(location.params.id as string);
        console.log("from movements ::::", this.id)
        this.pickinglist = await PickinlistEndpoint.getById(this.id)
        wmsStore.savemovements(await MovementEndpoint.getByPickinglist(this.pickinglist));
        this.movements = wmsStore.movements;


    }

    // @ts-ignore
    render() {
        if (this.movements.length > 0) {
            while (this.index < this.movements.length) {
                this.movement = this.movements[this.index]
                console.log("++++++++++", this.movement)
                if (this.movement.state === "pick") {
                    this.updateMovement(this.movement);
                    return html`
                        <div class="contents">
                            <vaadin-button theme="primary error" @click="${this.damagereport}">DAMAGE</vaadin-button>
                        </div>
                        <div class="contents">
                            <p>
                            <h2>${this.product?.name}</h2></p>
                            <textarea readonly>
                                    ${this.product?.description}
                                </textarea>
                        </div>
                        <div class="scope">
                            <vaadin-horizontal-layout size-full :expand>
                                <vaadin-icon icon="vaadin:package"></vaadin-icon>
                                <p><strong>QTY: </strong>${this.movement.quantity}</p>
                            </vaadin-horizontal-layout>
                            <vaadin-horizontal-layout size-full :expand>
                                <vaadin-icon icon="vaadin:map-marker"></vaadin-icon>
                                <p><strong>From: </strong>${this.movement.locationFrom}</p>
                            </vaadin-horizontal-layout>
                            <vaadin-horizontal-layout size-full :expand>
                                <vaadin-icon icon="vaadin:map-marker"></vaadin-icon>
                                <p><strong>To: </strong> ${this.movement.locationTo}</p>
                            </vaadin-horizontal-layout>
                        </div>

                        <div class="scope" @keyup=${this.shiftListener}>
                            <vaadin-text-field
                                    label="Barcode"
                                    .value=${this.palletBarcode}
                                    @input=${this.updatePalletbarcode}
                            ></vaadin-text-field>
                        </div>
                        <div class="scope" @keyup=${this.shiftListener}>
                            <vaadin-text-field
                                    label="Location"
                                    ?disabled=${this.isCorrectBarcode}
                                    .value=${this.locationBarcode}
                                    @input=${this.updateLocationBarcode}
                            ></vaadin-text-field>
                        </div>
                        <p> <strong>status:</strong> &emsp;&emsp;&emsp;&emsp; &emsp; &emsp;  ${this.movement.state}</p>
                        </div>
                    ` ;
                } else {
                    this.index++;
                    this.isCorrectBarcode=false;
                }
            }

        } else {
            return html`
                <div class="container">No Movement</div>
            `;
        }
        this.goBackToList();
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

    damagereport() {
        Router.go('damage/' + this.movement?.movementId)
    }

    async updateMovement(movement: Movement) {
        // @ts-ignore
        await MovementEndpoint.updateUser("processing", wmsStore.username, this.movement);
        this.product = await ProductEndpoint.getByMovement(movement);
    }

    async updatePickinglist() {
        // @ts-ignore
        await MovementEndpoint.updateState("picked", wmsStore.username, this.movement)
        console.log("updatePickinglist: ", this.movement)
        this.palletBarcode = '';
        this.locationBarcode = '';


    }

    shiftListener(e: KeyboardEvent) {
        if (e.key === "Shift") {
            this.palletBarcode = '';
            this.locationBarcode = '';
            this.isCorrectBarcode = true;
        }
    }


    updatePalletbarcode(e: { target: HTMLInputElement }) {
        this.palletBarcode = e.target.value;
        if (this.movement?.palleteNummer === this.palletBarcode) {
            this.isCorrectBarcode = false;
        } else {
            Notification.show("Pallet barcode is not correct!", {
                position: 'middle', theme: 'error'
            })
        }
    }

    updateLocationBarcode(e: { target: HTMLInputElement }) {
        this.locationBarcode = e.target.value;
        if (this.movement?.locationTo === this.locationBarcode) {
            this.updatePickinglist()
            console.log(MovementEndpoint.getById(this.movement.movementId))

            this.index++;
        } else {
            Notification.show("Location is not correct", {
                position: 'middle', theme: 'error'
            })
        }
    }
    goBackToList() {
        Notification.show("Pickinglist is scanned!!!!", {
            position: 'middle', theme: 'success'
        })
        Router.go("pickinglist/" + this.pickinglist?.company?.id);
    }

    setupConnectionListener() {
        const connectionState = (window as any).Vaadin
            .connectionState as ConnectionStateStore;
        connectionState.addStateChangeListener(
            (_: ConnectionState, current: ConnectionState) => {
                // Don't react to LOADING state
                if (this.offline && current === ConnectionState.CONNECTED) {
                    this.offline = false;
                    this.syncPending();
                } else if (current === ConnectionState.CONNECTION_LOST) {
                    this.offline = true;
                }
            });
    }
    syncPending() {
        this.updatePickinglist();
    }
}

