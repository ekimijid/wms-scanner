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


// @ts-ignore
@customElement('movements-view')
export class MovementsView extends View implements BeforeEnterObserver {

    // @ts-ignore
    @state() id: number | undefined;
    @state() pickinglist: Pickinglist | undefined;
    @state() selectedMovement: Movement | undefined;
    movements: Movement[] = []

    async onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands) {
        this.id = parseInt(location.params.id as string);
        console.log("from movements ::::", this.id)
        this.pickinglist=await PickinlistEndpoint.getById(this.id)
        this.movements=await MovementEndpoint.getByPickinglist(this.pickinglist);
        console.log("/*/*/*/*/*/*/*/", this.movements)

    }

    render() {
        return html`
            <div class="content flex gap-m h-full">
                <vaadin-grid class="grid h-full" .items=${this.movements}
                             .selectedItems=${this.selectedMovement}
                             @active-item-changed=${this.handleGridSelection}>
                    <vaadin-grid-column path="productId" header="Product" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="state" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="type"  auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="location" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="progressuser" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="handleduser" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="progresstimestamp" header="Progress time" auto-width></vaadin-grid-column>
                    
                </vaadin-grid>
            </div>
        `;
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
        Router.go('scanner/' + this.selectedMovement?.movementId)
    }
}