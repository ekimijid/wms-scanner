import {View} from "Frontend/views/view";
import {customElement, state} from "lit/decorators";
import {BeforeEnterObserver, PreventAndRedirectCommands, RouterLocation} from "@vaadin/router";
import {MovementEndpoint} from "Frontend/generated/endpoints";
import Movement from "Frontend/generated/com/essers/wmsscanner/entity/Movement";
import Product from "Frontend/generated/com/essers/wmsscanner/entity/Product";
import '@vaadin/button';
import '@vaadin/upload';
import type {UploadBeforeEvent} from '@vaadin/upload';
import {html} from "lit";
import {readAsDataURL} from "promise-file-reader";


// @ts-ignore
@customElement('damage-view')
export class DamageView extends View implements BeforeEnterObserver {
    // @ts-ignore
    @state() id: number | undefined;
    @state() movement: Movement | null = null
    @state() product: Product | null = null
    @state() image: string | null = '';

    async onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands) {
        this.id = parseInt(location.params.id as string);
        this.movement = await MovementEndpoint.getById(this.id);
    }

    render() {
        return html`
            <img src="${this.image}"/>
            <vaadin-upload
                    capture="camera"
                    accept="image/*"
                    @upload-before="${async (e: UploadBeforeEvent) => {
                        const file = e.detail.file;
                        const base64Image = await readAsDataURL(file);
                        this.image = base64Image;
                        e.preventDefault();
                    }}"
            ></vaadin-upload>
            <vaadin-button @click="${this.save}">Save</vaadin-button>
        `;
    }

    async save() {

    }
}