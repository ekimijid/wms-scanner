import '@vaadin/notification';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import {BeforeEnterObserver, PreventAndRedirectCommands, Router, RouterLocation} from "@vaadin/router";

import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import {customElement, state} from "lit/decorators.js";
import { View } from './view';
import {html} from "lit";
import Movement from "Frontend/generated/com/essers/wmsscanner/entity/Movement";
import {MovementEndpoint, PickinlistEndpoint} from "Frontend/generated/endpoints";
import { Notification } from '@vaadin/notification';
import {Binder, field} from "@hilla/form";
import MovementModel from "Frontend/generated/com/essers/wmsscanner/entity/MovementModel";
import PickinglistModel from "Frontend/generated/com/essers/wmsscanner/entity/PickinglistModel";
import { repeat } from 'lit/directives/repeat.js';


// @ts-ignore
@customElement('movements-view')
export class MovementsView extends View implements BeforeEnterObserver {
    // @ts-ignore
    @state() id: number | undefined;
    @state() pickinglist: Pickinglist | undefined;
    @state() selectedMovement: Movement | undefined;
    movements: Movement[] = []

    render() {
        Movements:
            return html`
                <ul>
                    ${this.movements.map(movementBinder => html`
                        <div>
                           ${movementBinder.company}
                        </div>
                      `)}
                </ul>
            `;
    }

    async onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands) {
        this.id = parseInt(location.params.id as string);
        console.log("from movements ::::", this.id)
        this.pickinglist=await PickinlistEndpoint.getById(this.id)
        this.movements=await MovementEndpoint.getByPickinglist(this.pickinglist);
        console.log("/*/*/*/*/*/*/*/", this.pickinglist.movements)

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

    firstSelectionEvent = true;

    handleGridSelection(e: CustomEvent) {
        if (this.firstSelectionEvent) {
            this.firstSelectionEvent = false;
            return;
        }
        this.selectedMovement=e.detail.value;
        if(this.selectedMovement?.state==="picked"){
            Notification.show("Barcode has already been scanned!")
        }
        else{
            Router.go('scanner/' + this.selectedMovement?.movementId)
        }

    }
}

