import { Vector2d } from '../../Math';
import { Sprite } from '../';

export interface IDrawComponent {
    position: Vector2d,
    destWidth: number,
    destHeight: number,
    sprite: any,
    staticFrame: number
}
