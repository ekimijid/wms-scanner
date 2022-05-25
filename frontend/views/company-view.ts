import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '@vaadin/combo-box';
import {View} from "Frontend/views/view";
import {Router} from '@vaadin/router';
import {CompanyEndpoint, PickinlistEndpoint} from "Frontend/generated/endpoints";
import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import {Notification} from '@vaadin/notification';
import {wmsStore} from "Frontend/stores/app-store";

@customElement('company-view')
export class CompanyView extends View {
    pickinglists: Pickinglist[] = []

    render() {
        return html`
            <dev class="flex flex-col gap-s p-m" style="width: 35%;">
                <vaadin-combo-box na style="color: red"
                                  placeholder="Select company"
                                  label="Company"
                                  item-label-path="name"
                                  item-value-path="id"
                                  .items="${wmsStore.companies}"
                                  @value-changed="${this.handleComboboxSelection}"

                ></vaadin-combo-box>
            </dev>
        `;
    }

    firstSelectionEvent = true;

    async handleComboboxSelection(e: CustomEvent) {
        if (this.firstSelectionEvent) {
            this.firstSelectionEvent = false;
            return;
        }
        this.pickinglists = await PickinlistEndpoint.getAll(await CompanyEndpoint.getByID(e.detail.value))
        if (this.pickinglists.length != 0) {
            Router.go("pickinglist/" + e.detail.value)
        } else Notification.show("NO PICKININGLIST", {
            position: 'middle', theme: 'error'
        })
    }


}