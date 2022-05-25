import {View} from "Frontend/views/view";
import {html} from "lit";
import '@vaadin/notification';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import {BeforeEnterObserver, PreventAndRedirectCommands, Router, RouterLocation} from "@vaadin/router";
import {CompanyEndpoint, PickinlistEndpoint} from "Frontend/generated/endpoints";
import Company from "Frontend/generated/com/essers/wmsscanner/entity/Company";
import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import {customElement, state} from "lit/decorators.js";
import {wmsStore} from "Frontend/stores/app-store";

// @ts-ignore
@customElement('pickinglist-view')
export class PickinglistView extends View implements BeforeEnterObserver {

    // @ts-ignore
    @state() id: number | undefined;
    @state() company: Company | undefined;
    pickinglists: Pickinglist[] = []
    selectedPickinglist: Pickinglist | undefined;

    async onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands) {
        this.id = parseInt(location.params.id as string);
        this.company = await CompanyEndpoint.getByID(this.id)
        this.pickinglists = await PickinlistEndpoint.getAll(this.company)
        wmsStore.savepickinglist(this.pickinglists)
    }

    render() {
        return html`

            <div class="content flex gap-m h-full">
                <vaadin-grid class="grid h-full" .items=${wmsStore.pickinglists}
                             .selectedItems=${this.selectedPickinglist}
                             @active-item-changed=${this.handleGridSelection}>
                    <vaadin-grid-column path="pickingListId" header="Id" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="company.name" header="Company" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="location" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="wmsSite.name" header="Site" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="wmsWarehouse.name" header="Warehouse" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="quantity" auto-width></vaadin-grid-column>
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
        this.selectedPickinglist = e.detail.value;
        // Router.go('movements/'+this.selectedPickinglist?.id)
        Router.go('scanner/' + this.selectedPickinglist?.pickingListId)
        this.pickinglists.forEach(value => console.log(value))
    }

}