import { GameUIComponent } from './GameUIComponent';
import { ButtonComponent } from './Components/ButtonComponent';
import { InputComponent } from './Components/InputComponent';

export class UIManager {
    constructor() {
        customElements.define('game-ui', GameUIComponent);
        customElements.define('gameui-button', ButtonComponent);
        customElements.define('gameui-input', InputComponent);
    }
}