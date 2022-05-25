import {html} from "lit";
import {customElement} from "lit/decorators.js";
import {View} from "Frontend/views/view";
import '@vaadin/notification';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import {Router} from '@vaadin/router';

@customElement('portal-view')
export class PortalView extends View {

    render() {
        return html`
            <div class="flex flex-col gap-s p-m" style="width: 35%;">
                <vaadin-button theme="primary error" @click="${this.fullpallet}">FULL PALLET</vaadin-button>
            </div>

            <div class="flex flex-col gap-s p-m" style="width: 35%;">
                <vaadin-button theme="primary error" @click="${this.partpallet}">PART PALLET</vaadin-button>
            </div>
            <div class="flex flex-col gap-s p-m" style="width: 35%;">
                <vaadin-button theme="primary error" @click="${this.interrack}">INTERRACK</vaadin-button>
            </div>
        `;
    }

    fullpallet() {
        Router.go("company")
    }

    partpallet() {
        Router.go("company")
    }

    interrack() {
        Router.go("company")

    }


}