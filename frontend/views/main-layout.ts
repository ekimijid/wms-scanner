import {AppLayout} from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar/vaadin-avatar';
import '@vaadin/context-menu';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {router} from '../index';
import {views} from '../routes';
import {appStore, uiStore, wmsStore} from '../stores/app-store';
import {Layout} from './view';


interface RouteInfo {
    path: string;
    title: string;
    icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
    render() {
        return html`
            <vaadin-app-layout primary-section="drawer">
                <header class="view-header" slot="navbar">
                    <vaadin-drawer-toggle aria-label="Menu toggle" class="view-toggle"
                                          theme="contrast"></vaadin-drawer-toggle>
                    <h1 class="view-title">${appStore.currentViewTitle}</h1>
                    <vaadin-avatar></vaadin-avatar>
                    <vaadin-avatar .name="${`${wmsStore.username}`}">
                    </vaadin-avatar>
                    <a href="/logout" class="ms-auto" ?hidden=${uiStore.offline}> Log out </a>

                </header>
                <section class="drawer-section" slot="drawer">
                    <h1 class="view-title">${appStore.applicationName}</h1>
                    <nav aria-labelledby="views-title" class="menu-item-container">
                        <ul class="navigation-list">
                            ${this.getMenuRoutes().map(
                                    (viewRoute) => html`
                                        <li>
                                            <a
                                                    ?highlight=${viewRoute.path == appStore.location}
                                                    class="menu-item-link"
                                                    href=${router.urlForPath(viewRoute.path)}>
                                                <span class="${viewRoute.icon} menu-item-icon"></span>
                                                <span class="menu-item-text">${viewRoute.title}</span>
                                            </a>
                                        </li>
                                    `
                            )}
                        </ul>
                    </nav>
                    <footer class="footer"></footer>
                </section>
                <slot></slot>
            </vaadin-app-layout>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.reaction(
            () => appStore.location,
            () => {
                AppLayout.dispatchCloseOverlayDrawerEvent();
            }
        );
    }

    private getMenuRoutes(): RouteInfo[] {
        return views.filter((route) => route.title) as RouteInfo[];
    }
}